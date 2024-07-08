import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Switch,
} from "@mui/joy";

const Customer = ({ formData, setFormData, checkGST, checkPAN }: any) => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12} sm={6} md={4}>
          <FormControl required>
            <FormLabel>Customer ID</FormLabel>
            <Input
              type="text"
              value={formData?.customer_id}
              disabled
              onChange={(e) =>
                setFormData({ ...formData, customer_id: e.target.value })
              }
              required
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <FormControl required>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <FormControl required>
            <FormLabel>Phone</FormLabel>
            <Input
              onKeyDown={(e) => {
                if (["E", "e", "-", "+", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              value={formData?.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              type="number"
              required
            />
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <FormControl required>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              value={formData?.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <FormControl required={formData?.isGST} error={checkGST}>
            <FormLabel>GST</FormLabel>
            <Input
              type="text"
              disabled={!formData?.isGST}
              value={formData?.customer_gst}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  customer_gst: e.target.value.toUpperCase(),
                });
              }}
              required
            />
            <FormHelperText>
              <Switch
                checked={formData?.isGST}
                startDecorator={
                  formData?.isGST ? (
                    <span style={{ fontSize: "12px", color: "green" }}>
                      GST ?
                    </span>
                  ) : (
                    <span style={{ fontSize: "12px", color: "red" }}>
                      NO GST
                    </span>
                  )
                }
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    isGST: e.target.checked,
                    customer_gst: "",
                  });
                }}
              />
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <FormControl required={formData?.isPAN} error={checkPAN}>
            <FormLabel>PAN</FormLabel>
            <Input
              type="text"
              disabled={!formData?.isPAN}
              value={formData?.customer_pan}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  customer_pan: e.target.value.toUpperCase(),
                });
              }}
              required
            />
            <FormHelperText>
              <Switch
                checked={formData?.isPAN}
                startDecorator={
                  formData?.isPAN ? (
                    <span style={{ fontSize: "12px", color: "green" }}>
                      PAN ?
                    </span>
                  ) : (
                    <span style={{ fontSize: "12px", color: "red" }}>
                      NO PAN
                    </span>
                  )
                }
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    isPAN: e.target.checked,
                    customer_pan: "",
                  });
                }}
              />
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <FormControl required>
            <FormLabel>Sales Representative</FormLabel>
            <Input
              type="text"
              value={formData?.salesrep}
              onChange={(e) =>
                setFormData({ ...formData, salesrep: e.target.value })
              }
              required
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <FormControl required>
            <FormLabel>Business Category</FormLabel>
            <Input
              type="text"
              value={formData?.businessCategory}
              onChange={(e) =>
                setFormData({ ...formData, businessCategory: e.target.value })
              }
              required
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customer;
