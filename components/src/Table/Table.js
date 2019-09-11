import React from "react";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "Make",
          field: "make",
          sortable: true,
          checkboxSelect: true
        },
        {
          headerName: "Model",
          field: "model"
        },
        {
          headerName: "Price",
          field: "price"
        }
      ],
      rowData: [
        {
          make: "Toyota",
          model: "Celica",
          price: 35000
        },
        {
          make: "Ford",
          model: "Mondeo",
          price: 32000
        },
        {
          make: "Porsche",
          model: "Boxter",
          price: 72000
        }
      ]
    };
  }

  render() {
    return (
      <div style={{ height: "150px", width: "600px" }} className="ag-theme-balham">
        <AgGridReact rowSelection="multiple" columnDefs={this.state.columnDefs} rowData={this.state.rowData} />
      </div>
    );
  }
}

Table.propTypes = {};

Table.defaultProps = {};

export default Table;
