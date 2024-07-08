import React from "react";
import { useLocation } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../Service/Api/Auth.service";
import { toast } from "sonner";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ColorSchemeToggle } from "../../utility";
import FrontIcon from "./FrontIcon";

function VerifyOTP() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (payload: any) => {
    setLoading(true);
    await AuthApi.verifypassword({ otp: payload, email: state.email })
      .then((res: any) => {
        toast.success(res.message);
        console.log(res);
        setLoading(false);
        if (res.isPasOpen) {
          navigate("/reset_password", { state: { email: res.email } });
        }
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--Form-maxWidth": "800px",
              "--Transition-duration": "0.4s", // set to `none` to disable transition
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
              minHeight: "100dvh",
              width: "100%",
              px: 2,
            }}
          >
            <Box
              component="header"
              sx={{
                py: 3,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
                {/* <IconButton variant="soft" color="primary" size="sm">
            <BadgeRoundedIcon />
          </IconButton>
          <Typography level="title-lg">XYZ Company</Typography> */}
              </Box>
              <ColorSchemeToggle />
            </Box>
            <Box
              component="main"
              sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                [`& .MuiFormLabel-asterisk`]: {
                  visibility: "hidden",
                },
              }}
            >
              <Stack gap={4} sx={{ mb: 1 }}>
                <FrontIcon />

                <Stack gap={1}>
                  <Typography component="h1" level="h3">
                    Verify OTP
                  </Typography>
                </Stack>
              </Stack>

              <Stack gap={4} sx={{}}>
                <form>
                  <FormControl required>
                    <FormLabel>Enter your OTP</FormLabel>
                    <Input
                      type="number"
                      onKeyDown={(e) => {
                        if (["E", "e", "-", "+", "."].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      name="email"
                      onChange={(e: any) => {
                        let len = e.target.value;
                        if (len.length === 6) {
                          handleSubmit(len);
                        }
                      }}
                    />
                  </FormControl>
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Button type="submit" fullWidth loading={loading}>
                      Submit
                    </Button>
                  </Stack>
                </form>
                <Typography
                  level="body-sm"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <span onClick={() => navigate("/")}>
                      <Button
                        startDecorator={<KeyboardBackspaceIcon />}
                        variant="soft"
                      >
                        Back
                      </Button>
                    </span>{" "}
                  </span>
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </div>
  );
}

export default VerifyOTP;
