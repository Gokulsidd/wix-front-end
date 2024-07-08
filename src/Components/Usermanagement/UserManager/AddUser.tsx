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
import Stack from "@mui/joy/Stack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Grid } from "@mui/joy";
import AuthApi from "../../../Service/Api/Auth.service";
import { toast } from "sonner";
import UserMgtApi from "../../../Service/Api/UserMgt.service";
import { getAuthData } from "../../../utility";

interface FormElements extends HTMLFormControlsCollection {
  emp_id: HTMLInputElement;
  name: HTMLInputElement;
  email: HTMLInputElement;
  phone: HTMLInputElement;
  role: HTMLInputElement;
  password: HTMLInputElement;
  confirm_password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function AddUserByAdmin() {
  const navigate = useNavigate();
  let { state } = useLocation();
  const id = getAuthData();
  const [pswVisible, setPswVisible] = React.useState(false);
  const [conPswVisible, setConPswVisible] = React.useState(false);
  const [loading, setLoading] = React.useState<any>(false);
  const [selectRoles, setSelectRoles] = React.useState([]);
  const [selectedID, setSelectedID] = React.useState(null);
  let west = state && (state?.role).toUpperCase();

  const addUser = async (payload: any) => {
    setLoading(true);
    await AuthApi.adminsignup({
      ...payload,
      admin_id: id?.company_id,
      company_name: id?.company_name,
      role_id: selectedID,
    })
      .then((res: any) => {
        toast.success(res.message);
        navigate("/dashboard/user_dashboard");
        setLoading(false);
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  const editUser = async (payload: any) => {
    setLoading(true);
    let filter = payload;
    delete filter.password;
    let filtered = {
      ...filter,
      company_name: id?.company_name,
      role_id: selectedID ? selectedID : state?.role_id,
    };
    await AuthApi.adminsignupedit(filtered, state?._id)
      .then((res: any) => {
        toast.success(res.message);
        navigate("/dashboard/user_dashboard");
        setLoading(false);
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  const getrole = async () => {
    await UserMgtApi.getrole()
      .then((res: any) => {
        let result = res.data.map((item: any) => {
          return { ...item, title: item.role.toUpperCase() };
        });
        setSelectRoles(result);
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  };

  React.useEffect(() => {
    getrole();
  }, []);

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
            // minHeight: "100dvh",
            width: "100%",
            // px: 2,
          }}
        >
          <Box sx={{ px: 2, py: 2 }}>
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                 {state ? "Edit Employee" : "Add Employee"} 
                </Typography>
              </Stack>
            </Stack>

            <Stack gap={4} sx={{ pt: 4, m: 2 }}>
              <form
                autoComplete="off"
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const passwordRegex = /^.{5,}$/;
                  let phoneRegex = /^\d{10}$/;
                  if (!phoneRegex.test(formElements.phone.value)) {
                    toast.error("Invalid Phone Number");
                    return;
                  }
                  if (!passwordRegex.test(formElements.password.value)) {
                    toast.error(
                      "Password must be at least 5 characters length"
                    );
                    return;
                  }
                  const data = {
                    emp_id: formElements.emp_id.value,
                    name: formElements.name.value,
                    email: formElements.email.value,
                    phone: formElements.phone.value,
                    password: formElements.password.value,
                    role: formElements.role.value.toLowerCase(),
                  };
                  if (
                    formElements.password.value !==
                    formElements.confirm_password.value
                  ) {
                    toast.error("Confirm password not matched");
                    return;
                  }
                  if (state) {
                    editUser(data);
                  } else {
                    addUser(data);
                  }
                }}
              >
                {""}
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                  <Grid xs={12} sm={6} md={4}>
                    <FormControl required>
                      <FormLabel>Employee ID</FormLabel>
                      <Input
                        type="text"
                        defaultValue={state?.emp_id}
                        name="emp_id"
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <FormControl required>
                      <FormLabel>Employee Name</FormLabel>
                      <Input
                        type="text"
                        defaultValue={state?.name}
                        name="name"
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <FormControl required>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        defaultValue={state?.email}
                        autoComplete="off"
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <FormControl required>
                      <FormLabel>Phone</FormLabel>
                      <Input
                        onKeyDown={(e) => {
                          if (["E", "e", "-", "+", "."].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        type="number"
                        defaultValue={state?.phone}
                        name="phone"
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <FormControl required>
                      <FormLabel>Role</FormLabel>
                      <Autocomplete
                        type="text"
                        disableClearable
                        getOptionLabel={(p: any) => p.title || west}
                        defaultValue={west}
                        name="role"
                        options={selectRoles}
                        onChange={(_, value) => {
                          setSelectedID(value?._id);
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                    <FormControl required disabled={state && true}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type={pswVisible == true ? "text" : "password"}
                        defaultValue={state && "********"}
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
                  </Grid>

                  <Grid xs={12} sm={6} md={4}>
                    <FormControl required disabled={state && true}>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type={conPswVisible == true ? "text" : "password"}
                        defaultValue={state && "********"}
                        name="confirm_password"
                        endDecorator={
                          <VisibilityIcon
                            fontSize="small"
                            onMouseOver={() => {
                              setConPswVisible(true);
                            }}
                            onMouseOut={() => {
                              setConPswVisible(false);
                            }}
                          />
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={6}></Grid>
                </Grid>{" "}
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

export default AddUserByAdmin;
