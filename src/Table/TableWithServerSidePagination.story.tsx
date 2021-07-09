import React from "react";
import { Table } from "..";
import { Pagination } from "../Pagination";

const COLUMNS = [
  { label: "Number", dataKey: "id" },
  { label: "Description", dataKey: "title" },
  { label: "Completed", dataKey: "completed" },
];

type TableState = {
  page: number,
  loading: boolean,
  rows: Array<any>
}

class TableWithServerSidePagination extends React.Component<{}, TableState> {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      loading: true,
      page: 1,
    };
  }

  componentDidMount() {
    const { page } = this.state;
    this.getData(page, null);
  }

  getData = (pageNumber, callback) => {
    const QUANTITY = 5;
    const startingIndex = (pageNumber - 1) * QUANTITY;
    const url = `https://jsonplaceholder.typicode.com/todos?_start=${startingIndex}&_limit=${QUANTITY}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState(
          {
            loading: false,
            rows: json.map(({ completed, ...item }) => ({
              ...item,
              completed: completed ? "Yes" : "-",
            })),
          },
          callback
        );
      });
  };

  onSelectPage = (page) => {
    this.getData(page, () => this.setState({ page }));
  };

  onSelectPrevious = () => {
    const { page } = this.state;
    this.onSelectPage(page - 1);
  };

  onSelectNext = () => {
    const { page } = this.state;
    this.onSelectPage(page + 1);
  };

  render() {
    const { rows, loading, page } = this.state;
    return (
      <>
        <Table columns={COLUMNS} rows={rows} loading={loading} />
        <Pagination
          pt="x3"
          justifyContent="flex-end"
          currentPage={page}
          totalPages={5}
          onNext={this.onSelectNext}
          onPrevious={this.onSelectPrevious}
          onSelectPage={this.onSelectPage}
        />
      </>
    );
  }
}

export default {
  title: "Components/Table",
};

export const WithServerSidePagination = () => <TableWithServerSidePagination />;

WithServerSidePagination.story = {
  name: "with server-side pagination",
};
