import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Box } from "@mui/joy";
// import AuthApi from "../../Service/Api/Auth.service";
import { ColorSchemeToggle, getAuthData } from "../../utility";
import React from "react";
// import { toast } from "sonner";
// import Dropdown from "@mui/joy/Dropdown";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
// import ListDivider from "@mui/joy/ListDivider";
// import PersonSharpIcon from "@mui/icons-material/PersonSharp";
// import { useNavigate } from "react-router-dom";

function openSidebar() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
}

function closeSidebar() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

export default function Header() {
  // let navigate = useNavigate();
  const id = getAuthData();
  // const [profile, setProfile] = React.useState<any>(null);

  // const getImage = async () => {
  //   await AuthApi.getheaderdetails(id.id)
  //     .then((res: any) => {
  //       setProfile(res.data);
  //     })
  //     .catch((err: any) => {
  //       toast.error(err.response.data.message);
  //     });
  // };

  React.useEffect(() => {
    // getImage();
  }, []);
  return (
    <Sheet
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100vw",
        // height: "var(--Header-height)",
        zIndex: 9998,
        p: 1,
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "52px",
            [theme.breakpoints.up("md")]: {
              "--Header-height": "0px",
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <MenuRoundedIcon />
      </IconButton>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mr: 1 }}>
        <Box sx={{ marginRight: "20px" }}>
          <ColorSchemeToggle sx={{ ml: "auto" }} />
        </Box>
        {/* <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="body-xs">{profile?.company_name}</Typography>
          <Typography level="body-xs">{profile?.email}</Typography>
        </Box>
        <Avatar variant="outlined" size="md" src={profile?.profileImg} /> */}
        {/* <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton> */}

        {/* //////// */}
        {/* <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              src={profile?.profileImg}
              srcSet={profile?.profileImg}
              sx={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={profile?.profileImg}
                  srcSet={profile?.profileImg}
                  sx={{ borderRadius: "50%" }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="body-xs">
                    {profile?.company_name}
                  </Typography>
                  <Typography level="body-xs">{profile?.email}</Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem onClick={() => navigate("/dashboard/profile")}>
              <PersonSharpIcon />
              My Profile
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>

            <MenuItem
              onClick={() => {
                clearAll();
                navigate("/");
              }}
            >
              <LogoutRoundedIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown> */}
      </Box>
    </Sheet>
  );
}
