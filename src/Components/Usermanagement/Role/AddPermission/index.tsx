import { Box, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AddPermission() {
  const navigate = useNavigate();
  // const rows = [
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  //   {
  //     id: "INV-1234",
  //     date: "Feb 3, 2023",
  //     status: "Refunded",
  //     customer: "misham",
  //   },
  // ];
  // const column = ["ID", "Date", "Status", "Customer"];

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Box sx={{ textAlign: "end", mb: 1 }}>
        <Button
          startDecorator={<AddCircleIcon />}
          size="sm"
          variant="soft"
          onClick={() => {
            navigate("/add_permission");
          }}
        >
          Add Permission
        </Button>
      </Box>
      {/* <TableComponent view={true} rows={rows} column={column} /> */}
    </Box>
  );
}

export default AddPermission;
