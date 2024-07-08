import { Box, Button, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoadingSpinner, NoData, getAuthData } from "../../utility";
import BOMTable from "./BOMTable";
import BOMService from "../../Service/Api/BOM.service";

function BomDashboard() {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  let approvalPage = "/dashboard/bom_approval";
  let { company_id } = getAuthData();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);

  const getbom = async () => {
    setLoading(true);
    await BOMService.getbom(company_id, page, limit)
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
    getbom();
  }, [page, limit]);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      {pathname !== approvalPage ? (
        <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
          <Button
            size="sm"
            variant="solid"
            sx={{ borderRadius: 3 }}
            onClick={() => {
              navigate("/dashboard/add_bom");
            }}
          >
            Add BOM
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "start", mb: 2 }}>
          <Typography level="title-lg">Quotation Approval</Typography>
        </Box>
      )}
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
        <NoData />
      ) : (
        <BOMTable
          rows={data}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          count={count}
          setLoading={setLoading}
          getbom={getbom}
          pathname={pathname}
          approvalPage={approvalPage}
        />
      )}
    </Box>
  );
}

export default BomDashboard;
