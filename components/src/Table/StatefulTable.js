import React from "react";
import PropTypes from "prop-types";
import withSelectableColumn from "./withSelectableColumn";
import BaseTable from "./BaseTable";
import { Pagination } from "../Pagination";

const getAllRowKeys = (rows, keyField) => rows.map(row => row[keyField]);

const paginateRows = (rows, rowsPerPage) =>
  rowsPerPage
    ? rows.reduce((acc, item, i) => (i % rowsPerPage ? acc : [...acc, rows.slice(i, i + rowsPerPage)]), [])
    : [rows];

class StatefulTable extends React.Component {
  constructor(props) {
    super(props);
    const { selectedRows, rowsPerPage, rows } = this.props;
    this.state = {
      selectedRows,
      isHeaderSelected: false,
      currentPage: 1,
      paginatedRows: paginateRows(rows, rowsPerPage)
    };
  }

  onRowSelectionChangeHandler = () => {
    const { onRowSelectionChange } = this.props;
    const { selectedRows, paginatedRows, currentPage } = this.state;
    if (onRowSelectionChange) {
      onRowSelectionChange(this.selectedRowsOnPage(selectedRows, paginatedRows, currentPage));
    }
  };

  onSelectRow = row => {
    const { paginatedRows, currentPage } = this.state;
    const { keyField } = this.props;
    const currentRowKey = row[keyField];
    const newRowSelections = !row.selected
      ? this.addRowToSelection(currentRowKey)
      : this.removeRowFromSelection(currentRowKey);
    this.setState(
      {
        selectedRows: newRowSelections,
        isHeaderSelected: this.allRowsSelectedOnPage(newRowSelections, paginatedRows, currentPage)
      },
      this.onRowSelectionChangeHandler
    );
  };

  onSelectHeader = () => {
    const { isHeaderSelected, paginatedRows, currentPage } = this.state;
    const { keyField } = this.props;
    const currentRowKeys = getAllRowKeys(this.getRowsOnPage(paginatedRows, currentPage), keyField);
    this.setState(
      {
        isHeaderSelected: !isHeaderSelected,
        selectedRows: isHeaderSelected
          ? this.removeRowsFromSelection(currentRowKeys)
          : this.addRowsToSelection(currentRowKeys)
      },
      this.onRowSelectionChangeHandler
    );
  };

  removeRowFromSelection = rowKeyToRemove => {
    const { selectedRows } = this.state;
    return selectedRows.filter(rowKey => rowKey !== rowKeyToRemove);
  };

  addRowToSelection = rowKeyToAdd => {
    const { selectedRows } = this.state;
    return [...selectedRows, rowKeyToAdd];
  };

  addRowsToSelection = rowsKeysToAdd => {
    const { selectedRows } = this.state;
    return [...selectedRows, ...rowsKeysToAdd];
  };

  removeRowsFromSelection = rowKeysToRemove => {
    const { selectedRows } = this.state;
    return selectedRows.filter(row => !rowKeysToRemove.includes(row));
  };

  getRowsOnPage = (rows, pageNumber) => {
    return rows[pageNumber - 1];
  };

  goToPage = pageNumber => {
    const { selectedRows, paginatedRows } = this.state;
    this.setState(
      {
        currentPage: pageNumber,
        isHeaderSelected: this.allRowsSelectedOnPage(selectedRows, paginatedRows, pageNumber)
      },
      this.onPageSelectionChangeHandler
    );
  };

  selectedRowsOnPage = (selectedRows, paginatedRows, pageNumber) => {
    const currentRows = this.getRowsOnPage(paginatedRows, pageNumber);
    const { keyField } = this.props;
    const allRowKeysOnPage = getAllRowKeys(currentRows, keyField);
    return selectedRows.filter(rowKey => allRowKeysOnPage.includes(rowKey));
  };

  allRowsSelectedOnPage = (selectedRows, paginatedRows, pageNumber) => {
    // TODO: needs degugging, not working when returning to a page
    const { keyField } = this.props;
    const currentRows = this.getRowsOnPage(paginatedRows, pageNumber);
    const allRowKeysOnPage = getAllRowKeys(currentRows, keyField);
    return allRowKeysOnPage.length === this.selectedRowsOnPage(selectedRows, paginatedRows, pageNumber).length;
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

  render() {
    const { selectedRows, isHeaderSelected, paginatedRows, currentPage } = this.state;
    const { rowsPerPage, hasSelectableRows } = this.props;
    const props = {
      ...this.props,
      rows: this.getRowsOnPage(paginatedRows, currentPage),
      ...(hasSelectableRows && {
        onSelectRow: this.onSelectRow,
        onSelectHeader: this.onSelectHeader,
        selectedRows: this.selectedRowsOnPage(selectedRows, paginatedRows, currentPage),
        isHeaderSelected
      })
    };
    return (
      <>
        {hasSelectableRows ? withSelectableColumn(BaseTable)(props) : <BaseTable {...props} />}

        {rowsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={paginatedRows.length}
            onSelectPage={this.goToPage}
            onNext={this.goToNextPage}
            onPrevious={this.goToPrevPage}
          />
        )}
      </>
    );
  }
}

StatefulTable.propTypes = {
  ...BaseTable.propTypes,
  selectedRows: PropTypes.arrayOf(PropTypes.string),
  onRowSelectionChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func
};

StatefulTable.defaultProps = {
  ...BaseTable.defaultProps,
  hasSelectableRows: false,
  selectedRows: [],
  isHeaderSelected: false
};

export default StatefulTable;
