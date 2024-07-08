import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function Representative({ managementReps, setManagementReps, loading }: any) {
  const handleManagementRepChange = (index: any, field: any, value: any) => {
    const newManagementReps: any = [...managementReps];
    newManagementReps[index][field] = value;
    setManagementReps(newManagementReps);
  };
  return (
    <Box>
      <Stack sx={{ py: 5 }}>
        <Typography level="title-md">Management Representatives</Typography>
      </Stack>
      {managementReps.map((rep: any, index: number) => (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={12} sm={6} md={4}>
            <FormControl required>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={rep.name}
                onChange={(e) => {
                  handleManagementRepChange(index, "name", e.target.value);
                }}
                required
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <FormControl required>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={rep.email}
                onChange={(e) =>
                  handleManagementRepChange(index, "email", e.target.value)
                }
                required
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <FormControl required>
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                value={rep.phone}
                onChange={(e) =>
                  handleManagementRepChange(index, "phone", e.target.value)
                }
                required
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <FormControl required>
              <FormLabel>Mobile</FormLabel>
              <Input
                onKeyDown={(e) => {
                  if (["E", "e", "-", "+", "."].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                value={rep.mobile}
                onChange={(e) =>
                  handleManagementRepChange(index, "mobile", e.target.value)
                }
                type="number"
                required
              />
            </FormControl>
          </Grid>
        </Grid>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          mt: 2,
        }}
      >
        <Button
          size="sm"
          sx={{ borderRadius: 3 }}
          disabled={loading}
          startDecorator={<AddIcon />}
          color="success"
          variant="plain"
          onClick={() => {
            setManagementReps([
              ...managementReps,
              { name: "", email: "", phone: "", mobile: "" },
            ]);
          }}
        >
          Add
        </Button>
        {managementReps.length > 1 && (
          <Button
            size="sm"
            variant="plain"
            color="danger"
            disabled={loading}
            sx={{ borderRadius: 3 }}
            startDecorator={<CloseIcon />}
            onClick={() => {
              if (managementReps.length > 1) {
                setManagementReps(managementReps.slice(0, -1));
              }
            }}
          >
            Remove
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Representative;
