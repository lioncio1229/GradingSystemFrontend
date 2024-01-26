import {
  Box,
  Button,
  Modal,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
} from "@mui/material";

type CustomDialogProps = {
  title?: string | JSX.Element | JSX.Element[];
  open: boolean;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element | JSX.Element[] | string | null;
};

export default function CustomModal({
  open,
  title,
  onClose,
  onConfirm,
  children,
}: CustomDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: 410,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card
          sx={{ minWidth: 300, maxHeight: "95vh", overflowY: "auto" }}
        >
          {title && 
          <>
            <CardHeader title={title} />
            <Divider />
          </>
          }
          <CardContent>{children}</CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={onConfirm}>
              Confirm
            </Button>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}
