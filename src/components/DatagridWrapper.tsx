import { DataGrid, GridColDef, GridRowsProp, GridRowModesModel, } from '@mui/x-data-grid';


interface DatagridWrapperProps {
    columns: GridColDef[],
    rows: GridRowsProp,
    rowModesModel: GridRowModesModel
}

export default function DatagridWrapper({
    rows,
    columns
} : DatagridWrapperProps) {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
