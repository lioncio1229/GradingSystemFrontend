import { useState, useMemo } from "react";
import DataTable, { Column } from "components/DataTable";
import {
  useGetAllUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "services/userServices";
import {
  Stack,
  IconButton,
  TextField,
  Toolbar,
  Button,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import {
  User,
  UserUpsertRequest,
} from "services/types";

import { Add, Edit, Delete } from "@mui/icons-material";
import CustomModal from "components/CustomModal";
import DeleteModal from "components/DeleteModal";
import { useSnackbar } from "notistack";
import SelectWrapper, { Item } from "components/SelectWrapper";

enum Upsert {
  Add,
  Update,
}

export const roleType: Item[] = [
  {
    key: "admin",
    value: "admin",
    label: "Admin",
  },
  {
    key: "faculty",
    value: "faculty",
    label: "Faculty",
  },
  {
    key: "adminFaculty",
    value: "admin,faculty",
    label: "Admin and Faculty",
  },
];

export default function ManageUsers() {
  const [targetTeacher, setTargetTeacher] =
    useState<UserUpsertRequest | null>(null);

  const [openUpsertModal, setOpenUpsertModal] = useState<boolean>(false);
  const [upsertType, setUpsertType] = useState<Upsert | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { data = [], refetch } = useGetAllUsersQuery(null);

  const [addTeacher] = useAddUserMutation();
  const [updateTeacher] = useUpdateUserMutation();
  const [deleteTeacher] = useDeleteUserMutation();

  const { enqueueSnackbar } = useSnackbar();

  const users : User[] = useMemo(() => {
    const _users : User[] = data;
    return _users.filter(o => o.roles.find(r => r.name === "admin"));
  }, [data]);


  const columns: Column<User>[] = [
    {
      label: "Username",
      display: (user) => user.userName,
    },
    {
      label: "Email",
      display: (user) => user.email,
    },
    {
      label: "First Name",
      display: (user) => user.firstName,
    },
    {
      label: "Last Name",
      display: (user) => user.lastName,
    },
    {
      label: "Roles",
      display: (user) => user.roles.map(o => o.name).join(","),
    },
    {
      label: "Actions",
      display: (user) => (
        <>
          <IconButton
            sx={{ color: "secondary.dark" }}
            onClick={() => handleUpdateButtonClick(user)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteButtonClick(user)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleAddButtonClick = () => {
    const teacherToAdd: UserUpsertRequest = {
      id: "",
      email: "",
      userName: "",
      firstName: "",
      lastName: "",
      password: "",
      roles: ["admin"],
    };

    setUpsertType(Upsert.Add);
    setTargetTeacher(teacherToAdd);
    setOpenUpsertModal(true);
  };

  const mapTeacherToScheme = (user: User): UserUpsertRequest => {
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles.map(o => o.name),
    } as UserUpsertRequest;
  };

  const handleUpdateButtonClick = (subject: User) => {
    const subjectToUpdate = mapTeacherToScheme(subject);
    setTargetTeacher(subjectToUpdate);
    setUpsertType(Upsert.Update);
    setOpenUpsertModal(true);
  };

  const handleDeleteButtonClick = (subject: User) => {
    const subjectToDelete = mapTeacherToScheme(subject);
    setTargetTeacher(subjectToDelete);
    setOpenDeleteModal(true);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setTargetTeacher({
      ...targetTeacher,
      [event.target.name]: event.target.value.split(","),
    } as UserUpsertRequest);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetTeacher({
      ...targetTeacher,
      [event.target.name]: event.target.value,
    } as UserUpsertRequest);
  };

  const handleConfirm = () => {
    if (targetTeacher == null || upsertType == null) return;

    let action = null;

    if (upsertType === Upsert.Add) action = addTeacher(targetTeacher);
    else action = updateTeacher(targetTeacher);

    action.unwrap().then((resp) => {
      refetch();
      setOpenUpsertModal(false);
      enqueueSnackbar(resp.message);
    });
  };

  const handleTeacherDelete = () => {
    if (targetTeacher == null) return;

    deleteTeacher({ id: targetTeacher.id })
      .unwrap()
      .then((resp) => {
        refetch();
        setOpenDeleteModal(false);
        enqueueSnackbar(resp.message);
      });
  };

  return (
    <>
      <CustomModal
        open={openUpsertModal}
        onConfirm={handleConfirm}
        onClose={() => setOpenUpsertModal(false)}
        title={<Typography color="primary" variant="h6">
        {(upsertType === Upsert.Add ? "Add" : "User") + " New User"}
      </Typography>}
      >
        {targetTeacher && (
          <Stack rowGap={2}>
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              fullWidth
              value={targetTeacher.email}
              onChange={handleTextChange}
              disabled={upsertType === Upsert.Update}
            />
            <TextField
              name="userName"
              variant="outlined"
              label="Username"
              fullWidth
              value={targetTeacher.userName}
              onChange={handleTextChange}
              disabled={upsertType === Upsert.Update}
            />
            <TextField
              name="password"
              variant="outlined"
              label={upsertType === Upsert.Add ? "Password" : ""}
              fullWidth
              value={upsertType === Upsert.Add ? targetTeacher.password : "Secret"}
              onChange={handleTextChange}
              disabled={upsertType === Upsert.Update}
              type={upsertType === Upsert.Update ? "password" : "text"}
            />
            <TextField
              name="firstName"
              variant="outlined"
              label="First Name"
              fullWidth
              value={targetTeacher.firstName}
              onChange={handleTextChange}
            />
            <TextField
              name="lastName"
              variant="outlined"
              label="Last Name"
              fullWidth
              value={targetTeacher.lastName}
              onChange={handleTextChange}
            />
            <SelectWrapper
              name="roles"
              items={roleType}
              label="Faculty"
              onChange={handleRoleChange}
              value={targetTeacher.roles.join(",")}
            />
          </Stack>
        )}
      </CustomModal>

      <DeleteModal
        open={openDeleteModal}
        onConfirm={handleTeacherDelete}
        onClose={() => setOpenDeleteModal(false)}
      />

      <Stack spacing={1}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            startIcon={<Add />}
            onClick={handleAddButtonClick}
            variant="contained"
          >
            Add User
          </Button>
        </Toolbar>
        <DataTable columns={columns} rows={users} />
      </Stack>
    </>
  );
}
