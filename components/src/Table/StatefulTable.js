import React from "react";
import PropTypes from "prop-types";
import withSelectableColumn from "./withSelectableColumn";
import BaseTable from "./BaseTable";

const getAllRowKeys = (rows, keyField) => rows.map(row => row[keyField]);

class StatefulTable extends React.Component {
  constructor(props) {
    super(props);
    const { selectedRows } = this.props;
    this.state = {
      selectedRows,
      isHeaderSelected: false
    };
  }

  onChangeSelectionHandler = () => {
    const { onChangeSelection } = this.props;
    const { selectedRows } = this.state;
    if (onChangeSelection) {
      onChangeSelection(selectedRows);
    }
  };

  onSelectRow = row => {
    const { selectedRows } = this.state;
    const { keyField } = this.props;
    this.setState(
      {
        selectedRows: !row.selected
          ? [...selectedRows, row[keyField]]
          : selectedRows.filter(rowKey => rowKey !== row[keyField])
      },
      this.onChangeSelectionHandler
    );
  };

  onSelectHeader = () => {
    const { isHeaderSelected, selectedRows } = this.state;
    const { rows, keyField } = this.props;
    this.setState(
      {
        isHeaderSelected: !isHeaderSelected,
        selectedRows: selectedRows.length < rows.length ? getAllRowKeys(rows, keyField) : []
      },
      this.onChangeSelectionHandler
    );
  };

  render() {
    const { selectedRows, isHeaderSelected } = this.state;
    const props = {
      ...this.props,
      onSelectRow: this.onSelectRow,
      onSelectHeader: this.onSelectHeader,
      selectedRows,
      isHeaderSelected
    };
    return withSelectableColumn(BaseTable)(props);
  }
}

StatefulTable.propTypes = {
  ...BaseTable.propTypes,
  selectedRows: PropTypes.arrayOf(PropTypes.string),
  onChangeSelection: PropTypes.func
};

StatefulTable.defaultProps = {
  ...BaseTable.defaultProps,
  hasSelectableRows: false,
  selectedRows: [],
  isHeaderSelected: false
};

export default StatefulTable;
