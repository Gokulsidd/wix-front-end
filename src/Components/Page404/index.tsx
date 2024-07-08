// import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
// import IconButton from "@mui/joy/IconButton";
// import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
// import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import framesxTheme from "./theme";
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TwoSidedLayout, { SignInTag } from "../../utility";
import {  useNavigate } from "react-router-dom";



export default function Page404() {
  const navigate = useNavigate()
  return (
    <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
      <CssBaseline />
      
      <Box
        sx={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          "& > div": {
            scrollSnapAlign: "start",
          },
        }}
      >
        <TwoSidedLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        The power to do more
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Page 404
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        A descriptive secondary text placeholder. Use it to explain your business
        offer better.
      </Typography>
      <Button size="lg" onClick={()=> navigate(-1)} startDecorator={<ArrowBackIcon fontSize="large" />}>
        Back
      </Button>
      <SignInTag/>
     
    </TwoSidedLayout>
       
      </Box>
    </CssVarsProvider>
  );
}
