import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import AuthApi from "../../../Service/Api/Auth.service";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { IconButton, Stack, styled } from "@mui/joy";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
import { clearAll } from "../../../Service/Localstorage";
import { useNavigate } from "react-router-dom";

export default function CompanyLogo() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [imageFile, setImageFile] = React.useState<any>(null);
  const [profileImage, setProfileImage] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<any>(false);

  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const imageupload = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);
    setLoading(true);
    await AuthApi.mainiconupload(formData)
      .then(() => {
        setLoading(false);
        clearAll();
        navigate("/");
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  const getImage = async () => {
    await AuthApi.getmainicon()
      .then((res: any) => {
        setProfileImage(res.data.profileImg);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getImage();
  }, []);

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 1 }}>
            Company Logo
          </Typography>
        </Box>
        <Tabs
          defaultValue={0}
          sx={{
            bgcolor: "transparent",
          }}
        ></Tabs>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Logo info</Typography>
            <Typography level="body-sm">
              Customize your logo, It will apper in the main page.
            </Typography>
          </Box>
          <Divider />
          <Stack direction="row" spacing={3} sx={{ display: "flex" }}>
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src={
                    selectedImage ||
                    profileImage ||
                    "https://static.vecteezy.com/system/resources/previews/020/911/736/original/profile-icon-user-icon-person-icon-free-png.png"
                  }
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>

              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                component="label"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 105,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </IconButton>
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              {/* <Button
                size="sm"
                variant="outlined"
                color="neutral"
                disabled={loading}
              >
                Cancel
              </Button> */}
              <Button
                size="sm"
                variant="solid"
                onClick={imageupload}
                disabled={!imageFile && true}
                loading={loading}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
