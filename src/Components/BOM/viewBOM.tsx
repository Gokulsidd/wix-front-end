import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Button, Grid } from "@mui/joy";
import { headersForBOM } from "./Calculation";
import { useReactToPrint } from "react-to-print";

export default function BOMView({ open, setOpen }: any) {

  const componentRef: any = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
            width: "82%",
            borderRadius: "sm",
            left: { sm: 0, md: "110px" },
            p: 3,
            height: "70%",
            minHeight: 0,
            overflow: "hidden auto",
            boxShadow: "lg",
          }}
          className="scroll-container"
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4 }}>
            {open?.state?.isApproval === "Approved" && (
              <Button
                sx={{ borderRadius: 3 }}
                variant="soft"
                color="warning"
                onClick={handlePrint}
              >
                Print
              </Button>
            )}
          </Box>
          <div ref={componentRef} style={{ padding: "10px" }}>
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Bill Of Material Details
            </Typography>
            <Box>
              <Grid container spacing={1} sx={{ flexGrow: 1, p: 2 }}>
                <Grid xs={6} md={3}>
                  <Typography id="modal-desc" textColor="text.tertiary">
                    BOM ID
                  </Typography>
                </Grid>
                <Grid xs={6} md={3}>
                  <Typography id="modal-desc" textColor="text.primary">
                    {open?.state?.bom_no}
                  </Typography>
                </Grid>

                <Grid xs={6} md={3}>
                  <Typography id="modal-desc" textColor="text.tertiary">
                    BOM Date
                  </Typography>
                </Grid>
                <Grid xs={6} md={3}>
                  <Typography id="modal-desc" textColor="text.primary">
                    {open?.state?.date}
                  </Typography>
                </Grid>

                <Grid xs={6} md={3}>
                  <Typography id="modal-desc" textColor="text.tertiary">
                    Description
                  </Typography>
                </Grid>
                <Grid xs={6} md={3}>
                  <Typography id="modal-desc" textColor="text.primary" textAlign="start">
                    {open?.state?.description}
                  </Typography>
                </Grid>

                <Grid xs={6} md={3} mt={2}>
                  <Typography id="modal-desc" textColor="text.tertiary">
                    Quotation Status
                  </Typography>
                </Grid>
                <Grid xs={6} md={3} mt={2}>
                  <Button
                    size="sm"
                    sx={{ borderRadius: 3 }}
                    variant="soft"
                    color={
                      open?.state?.isApproval === "Approved"
                        ? "success"
                        : open?.state?.isApproval === "Rejected"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {open?.state?.isApproval === "Approved"
                      ? "Approved"
                      : open?.state?.isApproval === "Rejected"
                      ? "Rejected"
                      : "Pending"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {/* <Box>
              <h4>List of Material's</h4>
            </Box> */}
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "6px", md: "10px" },
                mt: 3,
                overflowX: { xs: "scroll", md: "hidden" },
              }}
            >
              <table className="bomtable">
                <thead>
                  <tr>
                    {headersForBOM?.map((item: any, index: number) => (
                      <th
                        key={index}
                        style={{
                          width: item?.width,
                          placeContent: "center",
                          textAlign: "center",
                          padding: item?.isPadMar && 0,
                          margin: item?.isPadMar && 0,
                          textWrap: "wrap",
                        }}
                        className="bomtable"
                      >
                        {item?.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {open?.state?.bomlist?.map((item: any, index: number) => {
                    return (
                      <tr style={{ textAlign: "center" }}>
                        <td className="bomtable">{index + 1}</td>
                        <td className="bomtable">{item?.level}</td>
                        <td className="bomtable">{item?.part_number}</td>
                        <td className="bomtable" style={{textAlign:"center"}}>
                          {item?.product_description}
                        </td>
                        <td className="bomtable">{item?.qty_per_parent}</td>
                        <td className="bomtable">{item?.uom}</td>
                        <td className="bomtable">{item?.immediate_parent}</td>
                        <td className="bomtable">{item?.excess_tolerance}</td>
                        <td className="bomtable">
                          {item?.material_standard_cost}
                        </td>
                        <td className="bomtable">
                          {item?.total_material_cost}
                        </td>
                        <td className="bomtable">{item?.currency}</td>
                        <td className="bomtable">
                          {item?.labour_overhead_adder}
                        </td>
                        <td className="bomtable">{item?.profit_margin}</td>
                        <td className="bomtable">{item?.sales_price}</td>
                        <td className="bomtable">{item?.mrp}</td>
                        <td className="bomtable">{item?.discount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          </div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
