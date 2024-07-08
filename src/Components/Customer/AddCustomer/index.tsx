import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import Customer from "./Customer";
import Representative from "./Representative";
import Purchase from "./Purchase";
import { toast } from "sonner";
import CustomerService from "../../../Service/Api/Customer.service";
import { getAuthData } from "../../../utility";
import { validateGST, validatePAN } from "./Check";

function AddCustomer() {
  const navigate = useNavigate();
  let { state } = useLocation();
  let { company_id } = getAuthData();
  const [loading, setLoading] = React.useState<any>(false);
  const [checkGST, setCheckGST] = React.useState<any>(false);
  const [checkPAN, setCheckPAN] = React.useState<any>(false);

  const createID = () => {
    return "ID-" + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const [formData, setFormData] = React.useState({
    name: state?.name || "",
    email: state?.email || "",
    phone: state?.phone || "",
    address: state?.address || "",
    customer_id: state?.customer_id || createID(),
    customer_gst: state?.customer_gst || "",
    isGST: state?.isGST ,
    isPAN: state?.isPAN ,
    customer_pan: state?.customer_pan || "",
    salesrep: state?.salesrep || "",
    businessCategory: state?.businessCategory || "",
  });

  const [managementReps, setManagementReps] = React.useState(
    state?.managementRepresentatives || [
      { name: "", email: "", phone: "", mobile: "" },
    ]
  );

  const [purchaseContacts, setPurchaseContacts] = React.useState(
    state?.purchaseContacts || [{ name: "", email: "", phone: "", mobile: "" }]
  );

  const addcustomers = async () => {
    const payload = {
      formData,
      rep: managementReps,
      purchase: purchaseContacts,
      id: company_id,
    };
    setLoading(true);
    await CustomerService.addcustomers(payload)
      .then((res: any) => {
        toast.success(res.message);
        setLoading(false);
        navigate("/dashboard/customer_dashboard");
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  const updatecustomers = async () => {
    const payload = {
      formData,
      rep: managementReps,
      purchase: purchaseContacts,
    };
    setLoading(true);
    await CustomerService.updatecustomers(state?._id, payload)
      .then((res: any) => {
        toast.success(res.message);
        setLoading(false);
        navigate("/dashboard/customer_dashboard");
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme: any) => ({
          width: "100%",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box sx={{ px: 2, py: 2 }}>
            <Stack gap={4} sx={{ mb: 2 }}>
              <Typography component="h1" level="h3">
                {state ? "Edit Customer" : "Create New Customer"}
              </Typography>
            </Stack>

            <Stack gap={4} sx={{ pt: 4, m: 2 }}>
              <form
                onSubmit={(event: any) => {
                  event.preventDefault();
                  if (formData?.isGST && !validateGST(formData?.customer_gst)) {
                    setCheckGST(true);
                    toast.error("Please check the GST Number");
                    return;
                  } else {
                    setCheckGST(false);
                  }

                  if (formData?.isPAN && !validatePAN(formData?.customer_pan)) {
                    setCheckPAN(true);
                    toast.error("Please check the PAN Number");
                    return;
                  } else {
                    setCheckPAN(false);
                  }

                  if (state) {
                    updatecustomers();
                  } else {
                    addcustomers();
                  }
                }}
              >
                <Customer
                  formData={formData}
                  setFormData={setFormData}
                  checkGST={checkGST}
                  checkPAN={checkPAN}
                />
                <Representative
                  managementReps={managementReps}
                  setManagementReps={setManagementReps}
                  loading={loading}
                />
                <Purchase
                  purchaseContacts={purchaseContacts}
                  setPurchaseContacts={setPurchaseContacts}
                  loading={loading}
                />
                <Stack
                  gap={4}
                  sx={{
                    mt: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: {
                        md: "flex-end",
                        xs: "center",
                        sm: "flex-end",
                      },
                      width: "100%",
                    }}
                  >
                    <Button
                      type="submit"
                      size="sm"
                      sx={{ ml: 1, borderRadius: 3 }}
                      loading={loading}
                    >
                      Submit
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default AddCustomer;
