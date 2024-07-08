import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stack from "@mui/joy/Stack";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../Service/Api/Auth.service";
import { toast } from "sonner";
import { setLocalStorageItem } from "../../Service/Localstorage";
import { ColorSchemeToggle } from "../../utility";
import { Link } from "@mui/joy";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pswVisible, setPswVisible] = React.useState(false);

  const signin = async (payload: any) => {
    setLoading(true);
    await AuthApi.signin(payload)
      .then((res: any) => {
        toast.success(res.message);
        setLocalStorageItem("AUTH_TOKEN", res.token);
        setLocalStorageItem("AUTH_DATA", JSON.stringify(res.data));
        setLocalStorageItem("AUTH_ROLE", res.data.role);
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
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
            <Stack gap={4} sx={{ mb: 2 }}>
              {/* <FrontIcon /> */}

              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
              </Stack>
              {/* <Button
                    variant="soft"
                    color="neutral"
                    fullWidth
                    // startDecorator={<GoogleIcon />}
                  >
                    Continue with Google
                  </Button> */}
            </Stack>
            {/* <Divider
                  sx={(theme) => ({
                    [theme.getColorSchemeSelector('light')]: {
                      color: { xs: '#FFF', md: 'text.tertiary' },
                    },
                  })}
                >
                  or
                </Divider> */}
            <Stack gap={4} sx={{ mt: 2 }}>
              <form
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    email: formElements.email.value,
                    password: formElements.password.value,
                  };

                  signin(data);
                }}
              >
                <FormControl required>
                  <FormLabel>Email </FormLabel>
                  <Input type="text" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={pswVisible == true ? "text" : "password"}
                    name="password"
                    endDecorator={
                      <VisibilityIcon
                        fontSize="small"
                        onMouseOver={() => {
                          setPswVisible(true);
                        }}
                        onMouseOut={() => {
                          setPswVisible(false);
                        }}
                      />
                    }
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" fullWidth loading={loading}>
                    Sign in
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
                  gap: 1.5,
                }}
              >
                <span>
                  Don't have account ? &nbsp;{" "}
                  <span onClick={() => navigate("/signup")}>
                    <Link level="title-sm">Sign up</Link>
                  </span>
                </span>
                <span onClick={() => navigate("/forget_password")}>
                  <Link level="title-sm">Forgot your password?</Link>
                </span>{" "}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default SignIn;
