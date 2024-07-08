import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Grid,
  Typography,
} from "@mui/joy";
import Divider from "@mui/joy/Divider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UserMgtApi from "../../../Service/Api/UserMgt.service";
import { LoadingSpinner } from "../../../utility";

const RoleAssignByAdmin = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermission] = useState([]);
  const [selectRoles, setSelectRoles] = useState([]);
  const [selectRolesID, setSelectRolesID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);

  const handleCheckboxChange = (roleName: any, permission: any) => {
    setRoles((prevRoles: any) =>
      prevRoles.map((role: any) =>
        role.role === roleName
          ? {
              ...role,
              permission: role.permission.includes(permission)
                ? role.permission.filter((p: any) => p !== permission)
                : [...role.permission, permission],
            }
          : role
      )
    );
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

  const searchByRoleId = async (id: any) => {
    setRoleLoading(true);
    await UserMgtApi.searchbyroleid(id)
      .then((res: any) => {
        if (res.isData === false) {
          setRoles([]);
          toast.error(res?.message);
        } else {
          setRoles(res?.data?.permission);
        }
        setRoleLoading(false);
      })
      .catch((err: any) => {
        setRoleLoading(false);

        toast.error(err.response.data.message);
      });
  };

  const getpermission = async () => {
    await UserMgtApi.getpermission()
      .then((res: any) => {
        setPermission(res.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await UserMgtApi.RBACupdate(roles, selectRolesID)
      .then((res: any) => {
        toast.success(res.message);
        setLoading(false);
        navigate("/dashboard/user_dashboard");
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getpermission();
    getrole();
  }, []);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Card sx={{ border: "none" }}>
        <Box
          sx={{
            display: {xs:"inline",sm:"flex",md:"flex"},
            justifyContent: "space-between",
            alignItems: "center",
           
          }}
        >
          <Box>
            <Typography textAlign="center" level="title-lg">Role-Based Access Control</Typography>
          </Box>
          <Box sx={{ textAlign: "end", mb: 1, mt:{xs:3, sm:1} }}>
            <Autocomplete
              disableClearable
              placeholder="Select a Role"
              size="sm"
              options={selectRoles}
              getOptionLabel={(option: any) => option.title}
              sx={{ width: { xs: "100%", sm: "100%", md: "300px" } }}
              onChange={(_, value) => {
                searchByRoleId(value?._id);
                setSelectRolesID(value?._id);
              }}
            />
          </Box>
        </Box>
        {roleLoading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              p: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LoadingSpinner />
              <span>Please wait...</span>
            </Box>
          </Box>
        ) : (
          roles.length > 0 && (
            <>
              <Box sx={{ mt: 1 }}>
                {roles.map((role: any, index: number) => (
                  <>
                    <Grid
                      container
                      spacing={2}
                      sx={{ flexGrow: 1 }}
                      key={index}
                    >
                      <Grid sm={12} xs={12} md={3}>
                        <Box>
                          <h4>{role?.role?.toUpperCase()}</h4>
                        </Box>
                      </Grid>

                      <Grid
                        sm={12}
                        xs={12}
                        md={9}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: {
                            md: "space-around",
                            sm: "space-between",
                            xs: "space-between",
                          },
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 2,
                          m: "10px 0px",
                        }}
                      >
                        {permissions?.map((item: any, index: number) => (
                          <Box>
                            <label key={index}>
                              <input
                                type="checkbox"
                                style={{ accentColor: "skyblue" }}
                                checked={role?.permission?.includes(
                                  item?.permission
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    role?.role,
                                    item?.permission
                                  )
                                }
                              />
                              {item?.permission?.charAt(0).toUpperCase() +
                                item?.permission?.slice(1)}
                            </label>
                          </Box>
                        ))}
                      </Grid>
                    </Grid>
                    <Divider></Divider>
                  </>
                ))}
              </Box>

              <CardOverflow>
                <CardActions sx={{ alignSelf: "flex-end", pt: 1 }}>
                  <Button
                    size="sm"
                    variant="outlined"
                    disabled={loading}
                    color="neutral"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={loading}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Save
                  </Button>
                </CardActions>
              </CardOverflow>
            </>
          )
        )}
      </Card>
    </Box>
  );
};

export default RoleAssignByAdmin;
