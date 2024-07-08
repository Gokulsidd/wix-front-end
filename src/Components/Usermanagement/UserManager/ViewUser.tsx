import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Chip, Grid } from "@mui/joy";

export default function UserView({ open, setOpen }: any) {
  console.log(open?.state);

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open.view}
        onClose={() => setOpen({ view: false })}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: { md: "70%" },
            borderRadius: "sm",
            left: { sm: 0, md: "120px" },
            p: 3,
            height: "60%",
            minHeight: 0,
            overflow: "hidden auto",
            boxShadow: "lg",
          }}
          className="scroll-container"
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            User Details
          </Typography>
          <Box>
            <Grid
              container
              spacing={2}
              sx={{ flexGrow: 1, p: { sm: 0, md: 2 } }}
            >
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Employee ID
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.emp_id}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Name
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.name}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Email
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.email}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Phone
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.phone}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Company
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.company_name}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Role
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.role}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Status
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Chip
                  variant="soft"
                  size="lg"
                  sx={{ borderRadius: 3 }}
                  color={open?.state?.status == true ? "success" : "danger"}
                >
                  {open?.state?.status == true ? "Active" : "In-Active"}
                </Chip>
              </Grid>
            </Grid>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
