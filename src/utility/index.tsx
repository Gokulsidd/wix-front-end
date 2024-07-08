import * as React from "react";
import { useColorScheme } from "@mui/joy/styles";
import { IconButtonProps } from "@mui/joy/IconButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/joy/IconButton";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import { typographyClasses } from "@mui/joy/Typography";
import { Link } from "react-router-dom";
import { Chip, CircularProgress, Typography } from "@mui/joy";
import { getLocalStorageItem } from "../Service/Localstorage";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
      sx={[
        {
          "& > *:first-of-type": {
            display: mode === "dark" ? "none" : "initial",
          },
          "& > *:last-of-type": {
            display: mode === "light" ? "none" : "initial",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <DarkModeRoundedIcon />
      <LightModeIcon />
    </IconButton>
  );
}

export default function TwoSidedLayout({
  children,
  reversed,
}: React.PropsWithChildren<{ reversed?: boolean }>) {
  return (
    <Container
      sx={(theme) => ({
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: reversed ? "column-reverse" : "column",
        alignItems: "center",

        gap: 4,
        [theme.breakpoints.up(834)]: {
          flexDirection: "row",
          gap: 6,
        },
        [theme.breakpoints.up(1199)]: {
          gap: 12,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "50ch",
          textAlign: "center",
          flexShrink: 999,
          [theme.breakpoints.up(834)]: {
            minWidth: 420,
            alignItems: "flex-start",
            textAlign: "initial",
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: "balance",
          },
        })}
      >
        {children}
      </Box>
      <AspectRatio
        ratio={600 / 520}
        variant="plain"
        maxHeight={300}
        sx={(theme) => ({
          minWidth: 300,
          alignSelf: "stretch",
          [theme.breakpoints.up(834)]: {
            alignSelf: "initial",
            flexGrow: 1,
            "--AspectRatio-maxHeight": "520px",
            "--AspectRatio-minHeight": "400px",
          },
          borderRadius: "sm",
          flexBasis: "50%",
        })}
      ></AspectRatio>
    </Container>
  );
}

export function SignInTag() {
  return (
    <>
      <Typography
        level="body-sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Already have account?{" "}
        <Link to="/" style={{ textDecoration: "none" }}>
          &nbsp; Sign In
        </Link>
      </Typography>
    </>
  );
}

export const getAuthData = () => {
  let getId: any = getLocalStorageItem("AUTH_DATA");
  const authData = JSON.parse(getId);
  return authData;
};

export const getAuthToken = () => {
  const authToken = getLocalStorageItem("AUTH_TOKEN");
  return authToken;
};

export const LoadingSpinner = () => {
  return (
    <CircularProgress
      color="primary"
      determinate={false}
      size="md"
      variant="soft"
      thickness={2} 
    />
  );
};

export const NoData = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50vh",
      }}
    >
      <Chip
        variant="outlined"
        color="danger"
        startDecorator={<ErrorOutlineIcon />}
      >
        No Data Found
      </Chip>
    </Box>
  );
};
