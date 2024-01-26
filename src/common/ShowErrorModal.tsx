import { Dialog, DialogTitle, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { errorPopupSelector, setErrorOpen } from "globalSlice";

export default function ShowErrorModal() {
  const dispatch = useDispatch();
  const errorPopup = useSelector(errorPopupSelector);

  const handleClose = () => {
    dispatch(setErrorOpen({ isOpen: false, description: "" }));

    localStorage.clear();
    window.location.href = '/'
  };

  return (
    <Dialog maxWidth="md" open={errorPopup.isOpen} onClose={handleClose}>
      <Stack
        p={2}
        sx={{ minWidth: 250, display: "flex", justifyContent: "center" }}
      >
        <DialogTitle sx={{ fontSize: 18, textAlign: "center" }}>
          {errorPopup.description}
        </DialogTitle>
        <Button onClick={handleClose}>Ok</Button>
      </Stack>
    </Dialog>
  );
}
