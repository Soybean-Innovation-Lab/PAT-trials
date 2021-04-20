import { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

import { createCSVBlob } from "./csv";

function DataTable({ data, keys }) {
  let columns = useMemo(() => {
    return keys.map((k) => {
      return { Header: k, accessor: k };
    });
  }, [keys]);
  const tableInstance = useTable({ columns, data }, useSortBy, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = tableInstance;
  return (
    <div>
      <div className="d-flex align-items-end justify-content-between">
        <div className="d-flex flex-row align-items-end">
          <div className="d-flex flex-column">
            <div>
              Page{" "}
              <em>
                {pageIndex + 1} of {pageOptions.length}
              </em>
            </div>
            <div>Go to page:</div>
            <input
              type="number"
              defaultValue={pageIndex + 1 || 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
            />
          </div>
          <select
            className="form-select"
            style={{ width: "max-content" }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <a
          className="btn btn-primary"
          href={window.URL.createObjectURL(createCSVBlob(data, columns))}
          download="pat-filtered-export.csv"
        >
          {" "}
          Download as CSV{" "}
        </a>
      </div>
      <div style={{ width: "100%", "overflow-x": "scroll" }}>
        <table
          className="table"
          style={{ width: "max-content" }}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i class="bi bi-arrow-down-square-fill"></i>
                        ) : (
                          <i class="bi bi-arrow-up-square-fill"></i>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-start">
        <button
          className="btn btn-primary"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous Page
        </button>
        <button
          className="btn btn-primary order-5"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default DataTable;
