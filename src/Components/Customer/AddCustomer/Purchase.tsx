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

function Purchase({ purchaseContacts, setPurchaseContacts, loading }: any) {
  const handlePurchaseContactChange = (index: any, field: any, value: any) => {
    const newPurchaseContacts: any = [...purchaseContacts];
    newPurchaseContacts[index][field] = value;
    setPurchaseContacts(newPurchaseContacts);
  };
  return (
    <Box>
      <Stack sx={{ py: 5 }}>
        <Typography level="title-md">Purchase Contacts</Typography>
      </Stack>
      {purchaseContacts.map((contact: any, index: number) => (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={12} sm={6} md={4}>
            <FormControl required>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={contact.name}
                onChange={(e) =>
                  handlePurchaseContactChange(index, "name", e.target.value)
                }
                required
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <FormControl required>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={contact.email}
                onChange={(e) =>
                  handlePurchaseContactChange(index, "email", e.target.value)
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
                value={contact.phone}
                onChange={(e) =>
                  handlePurchaseContactChange(index, "phone", e.target.value)
                }
                required
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <FormControl required>
              <FormLabel>Mobile</FormLabel>
              <Input
                type="number"
                value={contact.mobile}
                onKeyDown={(e) => {
                  if (["E", "e", "-", "+", "."].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) =>
                  handlePurchaseContactChange(index, "mobile", e.target.value)
                }
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
            setPurchaseContacts([
              ...purchaseContacts,
              { name: "", email: "", phone: "", mobile: "" },
            ]);
          }}
        >
          Add
        </Button>
        {purchaseContacts.length > 1 && (
          <Button
            size="sm"
            variant="plain"
            color="danger"
            disabled={loading}
            sx={{ borderRadius: 3 }}
            startDecorator={<CloseIcon />}
            onClick={() => {
              if (purchaseContacts.length > 1) {
                setPurchaseContacts(purchaseContacts.slice(0, -1));
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

export default Purchase;
