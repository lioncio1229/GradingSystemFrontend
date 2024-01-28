import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Edit, Save, Cancel } from "@mui/icons-material";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import SubjectSelect from "../common/SubjectSelect";
import {
  useGetGradesBySubjectQuery,
  useUpdateGradeMutation,
} from "services/gradeServices";
import { Grade } from "services/types";
import { useSelector } from "react-redux";
import { subjectsSelector } from "../slice";

export default function Grades() {
  const subjects = useSelector(subjectsSelector);
  const [subjectId, setSubjectId] = useState<string>("");

  const { data: grades = [], refetch } = useGetGradesBySubjectQuery({
    subjectId,
  });
  const [updateGrade] = useUpdateGradeMutation();

  const [rows, setRows] = useState(grades as GridRowsProp);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    updateGrade(newRow as Grade)
      .unwrap()
      .then((resp) => {
        const _rows = rows.map((row) =>
          row.id === newRow.id ? updatedRow : row
        );
        setRows(_rows);
      });

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Name",
      type: "string",
      editable: false,
      flex: 3,
    },
    {
      field: "q1",
      headerName: "Prelim",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "q2",
      headerName: "Midterm",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "q3",
      headerName: "Semi",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "q4",
      headerName: "Final",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "average",
      headerName: "Average",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      type: "string",
      flex: 2,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 2,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit color="primary" />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleSubjectChange = (subjectId: string) => {
    setSubjectId(subjectId);
  };

  useEffect(() => {
    setRows(grades as GridRowsProp);
  }, [grades]);

  useEffect(() => {
    if(subjects?.length > 0) {
        setSubjectId(subjects[0].key);
    }
  }, [subjects]);

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId]);

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <SubjectSelect value={subjectId} onChange={handleSubjectChange} />
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        sx={{ mt: 2 }}
        hideFooterPagination={true}
        autoHeight={true}
      />
    </Box>
  );
}
