import * as React from "react";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Box } from "@mui/joy";

export default function ConfirmDelete({
  open,
  setOpen,
  deleteEvent,
  loading,
}: any) {
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Please confirm to Delete
          </DialogTitle>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Button
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{ borderRadius: 3 }}
              disabled={loading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="danger"
              size="sm"
              loading={loading}
              sx={{ borderRadius: 3 }}
              onClick={() => {
                deleteEvent();
              }}
            >
              Confirm
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
