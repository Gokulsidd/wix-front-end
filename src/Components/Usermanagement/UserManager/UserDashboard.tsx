import { Box, Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMgtApi from "../../../Service/Api/UserMgt.service";
import { toast } from "sonner";
import { getLocalStorageItem } from "../../../Service/Localstorage";
import { LoadingSpinner, NoData } from "../../../utility";
import UserManagerTable from "./UserTable";

function UserDashboard() {
  const navigate = useNavigate();
  let getId: any = getLocalStorageItem("AUTH_DATA");
  const id = JSON.parse(getId);
  const [loading, setLoading] = useState<any>(false);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);

  const getUsers = async () => {
    setLoading(true);
    const payload = {
      skip: page,
      limit: limit,
    };
    await UserMgtApi.getUsers(id.id, payload)
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
    getUsers();
  }, [page, limit]);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
        <Button
          size="sm"
          variant="solid"
          sx={{ borderRadius: 3 }}
          onClick={() => {
            navigate("/dashboard/add_user_admin");
          }}
        >
          Add User
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
        <UserManagerTable
          rows={data}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          count={count}
          setLoading={setLoading}
          getUsers={getUsers}
        />
      )}
    </Box>
  );
}

export default UserDashboard;
