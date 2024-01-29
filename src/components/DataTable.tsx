import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { SxProps } from "@mui/material";

export interface Row {}

export interface Column<Row> {
    align?: "left" | "right" | "center" | "inherit" | "justify" | undefined,
    minWidth?: number,
    label: string,
    display: (row : Row) => JSX.Element | string,
}

interface DataTableProps<TRows extends Row, TColumn extends Column<TRows>> {
    columns: TColumn[],
    rows?: TRows[],
    // withPagination: boolean,
    // pageIndex: number,
    // rowsPerPage: number,
    // onPageChange: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number,
    // onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
    // total: number,
    stickyHeader?: boolean,
    sx?: SxProps,
}

export default function DataTable<TRows extends Row, TColumn extends Column<TRows>>({
  columns,
  rows,
//   withPagination,
//   pageIndex,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   total,
  stickyHeader = true,
  sx,
} : DataTableProps<TRows, TColumn>) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", ...sx }}>
      {/* {withPagination && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={pageIndex}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )} */}
      <TableContainer>
        <Table stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {columns &&
                columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column, j) => {
                      return (
                        <TableCell key={j} align={column.align}>
                          {column.display(row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {withPagination && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={pageIndex}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )} */}
    </Paper>
  );
}