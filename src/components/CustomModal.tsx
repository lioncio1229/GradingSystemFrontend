import { Box, Button, Typography, Modal, Card, CardContent, CardActions, CardHeader } from "@mui/material";

type CustomDialogProps = {
    title: string,
    open: boolean,
    onConfirm?: React.MouseEventHandler<HTMLButtonElement>,
    onClose?: React.MouseEventHandler<HTMLButtonElement>,
    children?: JSX.Element | JSX.Element[] | null,
}

export default function CustomModal({
  open,
  title,
  onClose,
  onConfirm,
  children,
} : CustomDialogProps) {

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
        <Card sx={{ minWidth: 275 }}>
            <CardHeader 
              title={title}
            />
            <CardContent>
                {children}
            </CardContent>
            <CardActions sx={{justifyContent: "flex-end"}}>
                <Button variant="contained">Confirm</Button>
                <Button variant="contained">Close</Button>
            </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}