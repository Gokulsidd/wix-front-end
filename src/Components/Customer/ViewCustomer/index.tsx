import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Grid } from "@mui/joy";

export default function CustomerView({ open, setOpen }: any) {
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
            height: "70%",
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
            Customer Details
          </Typography>
          <Box>
            <Grid
              container
              spacing={2}
              sx={{ flexGrow: 1, p: { sm: 0, md: 2 } }}
            >
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Customer ID
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.customer_id}
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
                  phone
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.phone}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  GST
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.customer_gst}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.tertiary">
                  Category
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography id="modal-desc" textColor="text.primary">
                  {open?.state?.businessCategory}
                </Typography>
              </Grid>
            </Grid>

            <Grid xs={12} sx={{ mt: 2, pl: 2 }}>
              <Typography
                id="modal-desc"
                level="body-md"
                textColor="text.primary"
              >
                Management Representatives :
              </Typography>
            </Grid>
            {open?.state?.managementRepresentatives?.map(
              (item: any, index: number) => {
                return (
                  <Grid
                    container
                    spacing={1}
                    sx={{ flexGrow: 1, p: 2 }}
                    key={index}
                  >
                    <Grid xs={4}>
                      <Typography id="modal-desc" textColor="text.tertiary">
                        Name
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography id="modal-desc" textColor="text.primary">
                        {item?.name}
                      </Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Typography id="modal-desc" textColor="text.tertiary">
                        Email
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography id="modal-desc" textColor="text.primary">
                        {item?.email}
                      </Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Typography id="modal-desc" textColor="text.tertiary">
                        Phone
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography id="modal-desc" textColor="text.primary">
                        {item?.phone}
                      </Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Typography id="modal-desc" textColor="text.tertiary">
                        Mobile
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography id="modal-desc" textColor="text.primary">
                        {item?.mobile}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }
            )}

            <Grid xs={12} sx={{ mt: 2, pl: 2 }}>
              <Typography
                id="modal-desc"
                level="body-md"
                textColor="text.primary"
              >
                Purchase Contacts :
              </Typography>
            </Grid>
            {open?.state?.purchaseContacts?.map((item: any, index: number) => {
              return (
                <Grid
                  container
                  spacing={1}
                  sx={{ flexGrow: 1, p: 2 }}
                  key={index}
                >
                  <Grid xs={4}>
                    <Typography id="modal-desc" textColor="text.tertiary">
                      Name
                    </Typography>
                  </Grid>
                  <Grid xs={8}>
                    <Typography id="modal-desc" textColor="text.primary">
                      {item?.name}
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography id="modal-desc" textColor="text.tertiary">
                      Email
                    </Typography>
                  </Grid>
                  <Grid xs={8}>
                    <Typography id="modal-desc" textColor="text.primary">
                      {item?.email}
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography id="modal-desc" textColor="text.tertiary">
                      Phone
                    </Typography>
                  </Grid>
                  <Grid xs={8}>
                    <Typography id="modal-desc" textColor="text.primary">
                      {item?.phone}
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Typography id="modal-desc" textColor="text.tertiary">
                      Mobile
                    </Typography>
                  </Grid>
                  <Grid xs={8}>
                    <Typography id="modal-desc" textColor="text.primary">
                      {item?.mobile}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
