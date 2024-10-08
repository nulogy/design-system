import React, { Component } from "react";
import propTypes from "@styled-system/prop-types";
import { Pagination } from "../Pagination";
import { pick } from "../utils/subset";
import BaseTable, { BaseTableProps } from "./BaseTable";
import { addExpandableControl } from "./addExpandableControl";
import { addSelectableControl } from "./addSelectableControl";

const propNames = [
  ...Object.keys(propTypes.space),
  "columns",
  "rows",
  "noRowsContent",
  "keyField",
  "id",
  "loading",
  "footerRows",
  "rowHovers",
  "compact",
  "className",
  "stickyHeader",
  "onRowMouseEnter",
  "onRowMouseLeave",
];

export type StatefulTableProps<ColumnMetaData> = BaseTableProps<ColumnMetaData> & {
  selectedRows?: string[];
  onRowSelectionChange?: (...args: any[]) => any;
  onRowExpansionChange?: (...args: any[]) => any;
  rowsPerPage?: number;
  onPageChange?: (...args: any[]) => any;
  selectAllAriaLabel?: string;
  deselectAllAriaLabel?: string;
  paginationCss?: any;
  paginationProps?: any;
  expandedRows?: any[];
  hasSelectableRows?: boolean;
  hasExpandableRows?: boolean;
  onSelectRow?: (...args: any[]) => any;
  onSelectHeader?: (...args: any[]) => any;
  isHeaderSelected?: any;
};

const getAllRowKeys = (rows = [], keyField) => rows.map((row) => row[keyField]);
const paginateRows = (rows, rowsPerPage) =>
  rowsPerPage
    ? rows.reduce((acc, item, i) => (i % rowsPerPage ? acc : [...acc, rows.slice(i, i + rowsPerPage)]), [])
    : [rows];

type StatefulTableState = {
  selectedRows: any;
  expandedRows: any;
  isHeaderSelected: boolean;
  currentPage: number;
  paginatedRows: any;
};

class StatefulTable<ColumnMetaData> extends Component<StatefulTableProps<ColumnMetaData>, StatefulTableState> {
  static defaultProps = {
    noRowsContent: "No records have been created for this table.",
    keyField: "id",
    id: undefined,
    loading: false,
    footerRows: [],
    rowHovers: true,
    compact: false,
    className: undefined,
    stickyHeader: false,
    onRowMouseEnter: () => {},
    onRowMouseLeave: () => {},
    hasSelectableRows: false,
    selectedRows: [],
    isHeaderSelected: false,
    onRowExpansionChange: () => {},
    selectAllAriaLabel: undefined,
    deselectAllAriaLabel: undefined,
    /* PM support only */
    paginationCss: undefined,
    paginationProps: {},
  };

  constructor(props) {
    super(props);
    const { selectedRows, expandedRows, rowsPerPage, rows } = this.props;
    this.state = {
      selectedRows: selectedRows || [],
      expandedRows: expandedRows || [],
      isHeaderSelected: false,
      currentPage: 1,
      paginatedRows: paginateRows(rows, rowsPerPage),
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { rows, rowsPerPage } = nextProps;
    const paginatedRows = paginateRows(rows, rowsPerPage);
    const { currentPage } = prevState;
    // when the rows prop changes paginate the new rows and reset the current page
    return {
      paginatedRows,
      currentPage: paginatedRows.length < currentPage ? paginatedRows.length || 1 : currentPage,
    };
  }
  onRowExpansionChangeHandler = () => {
    const { onRowExpansionChange } = this.props;
    const { expandedRows, currentPage } = this.state;
    if (onRowExpansionChange) {
      onRowExpansionChange(this.currentRowsByPageSelector(expandedRows, currentPage));
    }
  };
  onExpandRow = (row) => {
    const { keyField, onRowExpansionChange } = this.props;
    const currentRowKey = row[keyField];
    const newExpandedRows = !row.expanded
      ? this.addRowToExpandedRows(currentRowKey)
      : this.removeRowFromExpandedRows(currentRowKey);
    this.setState(
      {
        expandedRows: newExpandedRows,
      },
      onRowExpansionChange(newExpandedRows)
    );
  };
  removeRowFromExpandedRows = (rowKeyToRemove) => {
    const { expandedRows } = this.state;
    return expandedRows.filter((rowKey) => rowKey !== rowKeyToRemove);
  };
  addRowToExpandedRows = (rowKeyToAdd) => {
    const { expandedRows } = this.state;
    return [...expandedRows, rowKeyToAdd];
  };
  onRowSelectionChangeHandler = () => {
    const { onRowSelectionChange } = this.props;
    const { selectedRows, currentPage } = this.state;
    if (onRowSelectionChange) {
      onRowSelectionChange(this.currentRowsByPageSelector(selectedRows, currentPage));
    }
  };
  onSelectRow = (row) => {
    const { currentPage } = this.state;
    const { keyField } = this.props;
    const currentRowKey = row[keyField];
    const newRowSelections = !row.selected
      ? this.addRowToSelection(currentRowKey)
      : this.removeRowFromSelection(currentRowKey);
    this.setState(
      {
        selectedRows: newRowSelections,
        isHeaderSelected: this.areAllRowsSelectedOnPage(newRowSelections, currentPage),
      },
      this.onRowSelectionChangeHandler
    );
  };
  onSelectHeader = () => {
    const { isHeaderSelected, currentPage } = this.state;
    const { keyField } = this.props;
    const currentRowKeys = getAllRowKeys(this.rowsByPageSelector(currentPage), keyField);
    this.setState(
      {
        isHeaderSelected: !isHeaderSelected,
        selectedRows: isHeaderSelected
          ? this.removeRowsFromSelection(currentRowKeys)
          : this.addRowsToSelection(currentRowKeys),
      },
      this.onRowSelectionChangeHandler
    );
  };
  removeRowFromSelection = (rowKeyToRemove) => {
    const { selectedRows } = this.state;
    return selectedRows.filter((rowKey) => rowKey !== rowKeyToRemove);
  };
  addRowToSelection = (rowKeyToAdd) => {
    const { selectedRows } = this.state;
    return [...selectedRows, rowKeyToAdd];
  };
  addRowsToSelection = (rowsKeysToAdd) => {
    const { selectedRows } = this.state;
    return [...selectedRows, ...rowsKeysToAdd];
  };
  removeRowsFromSelection = (rowKeysToRemove) => {
    const { selectedRows } = this.state;
    return selectedRows.filter((row) => !rowKeysToRemove.includes(row));
  };
  rowsByPageSelector = (pageNumber) => {
    const { paginatedRows } = this.state;
    return paginatedRows[pageNumber - 1];
  };
  goToPage = (pageNumber) => {
    const { selectedRows } = this.state;
    const { hasSelectableRows } = this.props;
    this.setState(
      {
        currentPage: pageNumber,
        ...(hasSelectableRows && {
          isHeaderSelected: this.areAllRowsSelectedOnPage(selectedRows, pageNumber),
        }),
      },
      this.onPageSelectionChangeHandler
    );
  };
  currentRowsByPageSelector = (rows, pageNumber) => {
    const currentRows = this.rowsByPageSelector(pageNumber);
    const { keyField } = this.props;
    const allRowKeysOnPage = getAllRowKeys(currentRows, keyField);
    return allRowKeysOnPage.filter((rowKey) => rows.includes(rowKey));
  };
  areAllRowsSelectedOnPage = (selectedRows, pageNumber) => {
    const { keyField } = this.props;
    const currentRows = this.rowsByPageSelector(pageNumber);
    const allRowKeysOnPage = getAllRowKeys(currentRows, keyField);
    return allRowKeysOnPage.length === this.currentRowsByPageSelector(selectedRows, pageNumber).length;
  };
  goToPrevPage = () => {
    const { currentPage } = this.state;
    this.goToPage(currentPage - 1);
  };
  goToNextPage = () => {
    const { currentPage } = this.state;
    this.goToPage(currentPage + 1);
  };
  onPageSelectionChangeHandler = () => {
    const { onPageChange } = this.props;
    const { currentPage } = this.state;
    if (onPageChange) {
      onPageChange(currentPage);
    }
  };
  getControlProps = () => {
    const { selectedRows, isHeaderSelected, currentPage, expandedRows } = this.state;
    const { hasSelectableRows, hasExpandableRows } = this.props;
    const selectionConfig = {
      onSelectRow: this.onSelectRow,
      onSelectHeader: this.onSelectHeader,
      selectedRows: this.currentRowsByPageSelector(selectedRows, currentPage),
      isHeaderSelected,
    };
    const expandableConfig = {
      onRowExpansionChange: this.onExpandRow,
      expandedRows,
    };
    const props: StatefulTableProps<ColumnMetaData> = {
      ...this.props,
      rows: this.rowsByPageSelector(currentPage) || [],
      ...(hasSelectableRows && selectionConfig),
      ...(hasExpandableRows && expandableConfig),
    };
    const selectableProps = { ...props, ...addSelectableControl(props as any) };
    const expandableProps = { ...props, ...addExpandableControl(props) };
    if (hasSelectableRows && hasExpandableRows) return { ...props, ...addExpandableControl(selectableProps) };
    if (hasSelectableRows) return selectableProps;
    if (hasExpandableRows) return expandableProps;
    return props;
  };
  render() {
    const { paginatedRows, currentPage } = this.state;
    const { rowsPerPage, paginationProps, paginationCss } = this.props;
    const baseTableProps = pick(this.getControlProps(), ...propNames);
    return (
      <>
        <BaseTable {...baseTableProps} />

        {rowsPerPage && (
          <Pagination
            pt="x2"
            currentPage={currentPage}
            totalPages={paginatedRows.length || 1}
            onSelectPage={this.goToPage}
            onNext={this.goToNextPage}
            onPrevious={this.goToPrevPage}
            justifyContent="flex-end"
            css={paginationCss}
            {...paginationProps}
          />
        )}
      </>
    );
  }
}

export default StatefulTable;
