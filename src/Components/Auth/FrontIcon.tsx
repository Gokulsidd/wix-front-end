import { Box } from "@mui/joy";
import React from "react";
import AuthApi from "../../Service/Api/Auth.service";

function FrontIcon({ where = "", w = "", h = "" }: any) {
  const [profileImage, setProfileImage] = React.useState<any>(null);

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
    <>
      {where == "sidebar" ? (
        <img
          style={{
            width: w,
            height: h,
            objectFit: "cover",
          }}
          src={
            profileImage ||
            "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
          }
          alt=""
        />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={
              profileImage ||
              "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
            }
            alt=""
          />
        </Box>
      )}
    </>
  );
}

export default FrontIcon;
