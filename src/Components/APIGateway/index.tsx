import { toast } from "sonner";
import ApiGateway from "../../Service/Api/ApiGateway";
import { Box, Button, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import Table, { TableProps } from "@mui/joy/Table";
import moment from "moment";
import { LoadingSpinner } from "../../utility";

function APIGateway() {
  const [loading, setLoading] = useState(false);
  const [tableloading, setTableLoading] = useState(false);
  const [data, setData] = useState([]);

  const getcustomers = async () => {
    setLoading(true);
    await ApiGateway.getData()
      .then((res: any) => {
        console.log(res.data);
        toast.success(res.message);
        getLogData();
        setLoading(false);
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  const getLogData = async () => {
    setTableLoading(true);
    await ApiGateway.getLogData()
      .then((res: any) => {
        setData(res.data);
        setTableLoading(false);
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setTableLoading(false);
      });
  };

  useEffect(() => {
    getLogData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: 'center',
        mt: 3,
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <Typography level="h4" fontSize="xl"   sx={{alignItems:"center",mb: 0.5}}>
        Kindly click the below button for order details transfer Wix to Customcat.
      </Typography > */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          alignItems: "center",
          mr: 5,
        }}
      >
        <Button
          size="sm"
          variant="solid"
          sx={{ borderRadius: 3 }}
          onClick={getcustomers}
          loading={loading}
        >
          Click to data transfer
        </Button>
      </Box>
      <Box sx={{ px: { sm: 1, md: 2 }, mt: 3 }}>
        {tableloading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "50vh",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <LoadingSpinner />
            <span>Please wait...</span>
          </Box>
        ) : data.length !== 0 ? (
          <Table>
            <thead>
              <tr>
                <th style={{ width: "5%", textAlign: "center" }}>S.No</th>
                <th style={{ width: "10%" }}>Date</th>
                <th style={{ width: "10%" }}>Time</th>
                <th style={{ width: "50%" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => {
                console.log(item);
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td>{moment(item.createdAt).format("YYYY-MM-DD")}</td>
                    <td>{moment(item.createdAt).format("hh:mm A")}</td>
                    <td>{item.log_message}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "30vh",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <span>No Data</span>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default APIGateway;
