import { Box, Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../Service/Api/Customer.service";
import { toast } from "sonner";
import { LoadingSpinner, NoData, getAuthData } from "../../utility";
import CustomerTable from "./CustomerTable";

function CustomerDashboard() {
  const navigate = useNavigate();
  let Id = getAuthData();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);

  const getcustomers = async () => {
    setLoading(true);
    await CustomerService.getcustomers(Id?.company_id,page, limit)
      .then((res: any) => {
        setData(res.data);
        setCount(res.count);
        setLoading(false);
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getcustomers();
  }, [page, limit]);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
        <Button
          size="sm"
          variant="solid"
          sx={{ borderRadius: 3 }}
          onClick={() => {
            navigate("/dashboard/add_customer");
          }}
        >
          Add Customer
        </Button>
      </Box>
      {loading ? (
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
      ) : data.length == 0 ? (
       <NoData/>
      ) : (
        <CustomerTable
          rows={data}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          count={count}
          setLoading={setLoading}
          getcustomers={getcustomers}
          
        />
      )}
    </Box>
  );
}

export default CustomerDashboard;
