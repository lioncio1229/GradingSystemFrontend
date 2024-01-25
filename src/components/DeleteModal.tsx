import CustomModal from "./CustomModal";
import { Typography, Toolbar } from "@mui/material";
import { Delete } from "@mui/icons-material";

type DeleteModalProps = {
    open: boolean;
    onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
;
export default function DeleteModal({
    open,
    onConfirm,
    onClose,
} : DeleteModalProps) {
    return (
        <CustomModal
            title="Delete this shit"
            open={open}
            onClose={onClose}
            onConfirm={onConfirm}
        >
            <Toolbar disableGutters>
                <Delete fontSize="large" color="error" />
                <Typography>Do you want to delete this?</Typography>
            </Toolbar>
      </CustomModal>
    )
}