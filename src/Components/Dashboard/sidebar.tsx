import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FrontIcon from "../Auth/FrontIcon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect } from "react";
import { basicRoute } from "./sideroute";
import { getAuthData } from "../../utility";
import { Divider } from "@mui/joy";
import { clearAll } from "../../Service/Localstorage";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

function closeSidebar() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let isAllow = getAuthData();

  const findPermission = (arr1: any, arr2: any) => {
    return arr1?.filter((obj1: any) => {
      return arr2?.some(
        (obj2: any) =>
          obj1?.role === obj2?.role && obj2?.permission?.includes("read")
      );
    });
  };

  let sidebarRoute = findPermission(basicRoute, isAllow?.permission);

  useEffect(() => {
    !isAllow && navigate("/");
  }, [isAllow]);

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "220px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box>
        {/* <FrontIcon where={"sidebar"} w={50} h={50} /> */}
      </Box>
      <Box
        className="scroll-container"
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {sidebarRoute?.map((item: any, index: number) => {
            return (
              <Link
                key={index}
                to={!item?.subRoute && item?.link}
                style={{
                  textDecoration: "none",
                }}
              >
                <ListItem nested>
                  {item?.subRoute ? (
                    <Toggler
                      renderToggle={({ open, setOpen }: any) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                          {item?.icon}
                          <ListItemContent>
                            <Typography level="title-sm">
                              {item?.name}
                            </Typography>
                          </ListItemContent>
                          <KeyboardArrowDownIcon
                            sx={{ transform: open ? "rotate(180deg)" : "none" }}
                          />
                        </ListItemButton>
                      )}
                    >
                      <List sx={{ gap: 0.5, mt: 0.5 }}>
                        {item?.subRoute.map((sub: any, index: number) => {
                          return (
                            <Link
                              key={index}
                              to={sub?.link}
                              style={{
                                textDecoration: "none",
                                fontSize: "12px",
                              }}
                            >
                              <ListItem>
                                <ListItemButton
                                  selected={
                                    (pathname === sub?.link ||
                                      pathname.includes(sub?.link)) &&
                                    true
                                  }
                                >
                                  {sub?.name}
                                </ListItemButton>
                              </ListItem>
                            </Link>
                          );
                        })}
                      </List>
                    </Toggler>
                  ) : (
                    <ListItemButton selected={pathname === item?.link && true}>
                      {item?.icon}
                      <ListItemContent>
                        <Typography level="title-sm">{item?.name}</Typography>
                      </ListItemContent>
                    </ListItemButton>
                  )}
                </ListItem>
              </Link>
            );
          })}

          {/* 
          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/messages/"
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem> */}
        </List>
        
      </Box>
      <Box >
          <Divider />
          {/* <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }} level="title-sm" mt={1} onClick={() => {
            clearAll();
            navigate("/");
          }}><LogoutRoundedIcon />Log out</Typography> */}
          <ListItemButton sx={{mt:2,gap:1}} onClick={() => {
            clearAll();
            navigate("/");
          }}>
            <LogoutRoundedIcon />
            <ListItemContent>
              <Typography level="title-sm" >Logout</Typography>
            </ListItemContent>
          </ListItemButton>
        </Box>
    </Sheet>
  );
}
