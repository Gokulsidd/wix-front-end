import {  useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import {
  MRPCalculation,
  SalePriceCalculation,
  TMCCalculation,
  currencyOptions,
  headersForBOM,
  initialRow,
  unitOptions,
} from "./Calculation";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BOMService from "../../Service/Api/BOM.service";
import { getAuthData } from "../../utility";

const AddBOM = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  let { company_id } = getAuthData();
  const [rows, setRows] = useState<any>(state?.bomlist || [initialRow]);
  const [loading, setLoading] = useState<any>(false);
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    description: state?.description,
    bom_no: state?.bom_no,
    date: state?.date || "",
  });

  const handleChange = (index: number, field: any, value: any) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    newRows[index].total_material_cost = TMCCalculation(newRows, index);
    newRows[index].sales_price = SalePriceCalculation(newRows, index);
    newRows[index].mrp = MRPCalculation(newRows, index);
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, initialRow]);
  };

  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((_: any, i: any) => i !== index));
  };

  const addbom = async () => {
    const bomlist = {
      payload: rows,
      id: company_id,
      formData,
    };
    setLoading(true);
    await BOMService.addbom(bomlist)
      .then((res: any) => {
        toast.success(res.message);
        setLoading(false);
        navigate("/dashboard/bom_dashboard");
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  const editbom = async () => {
    setLoading(true);
    await BOMService.editbom(state?._id, { payload: rows, formData })
      .then((res: any) => {
        toast.success(res.message);
        setLoading(false);
        navigate("/dashboard/bom_dashboard");
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Stack gap={4} sx={{ mb: 2 }}>
        <Typography component="h1" level="h3">
          {/* {state ? "Edit Bill of Material" : "Add Bill of Material"} */}
        </Typography>
      </Stack>

      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (state) {
              editbom();
            } else {
              addbom();
            }
          }}
        >
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={12} sm={6} md={4}>
                <FormControl required>
                  <FormLabel>BOM Number</FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    value={formData?.bom_no}
                    onChange={(e) =>
                      setFormData({ ...formData, bom_no: e.target.value })
                    }
                    required
                  />
                </FormControl>
              </Grid>

              <Grid xs={12} sm={6} md={4}>
                <FormControl required>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    size="sm"
                    value={formData?.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid xs={12} sm={6} md={4}>
                <FormControl required>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    size="sm"
                    value={formData?.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    slotProps={{
                      input: {
                        max: today,
                      },
                    }}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Stack sx={{ pt: 5 }}>
            <Typography component="h1" level="h4">
              Bill of Material's
            </Typography>
          </Stack>
          <Box sx={{ width: "100%", pt: 3 }}>
            <Sheet
              variant="outlined"
              sx={{
                "--TableCell-height": "30px",
                "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
                "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
                overflow: "auto",
              }}
            >
              <Table borderAxis="bothBetween" hoverRow>
                <thead>
                  <tr>
                    {headersForBOM?.map((item: any, index: number) => (
                      <th
                        key={index}
                        style={{
                          width: item?.width,
                          placeContent: "center",
                          textAlign: "center",
                          padding: item?.isPadMar && 0,
                          margin: item?.isPadMar && 0,
                          textWrap: "wrap",
                        }}
                        className="tablehead"
                      >
                        {item?.title}
                      </th>
                    ))}

                    {Object.keys(rows).length > 1 && (
                      <th
                        style={{
                          width: 100,
                          placeContent: "center",
                          textAlign: "center",
                          textWrap: "wrap",
                        }}
                      >
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row: any, index: number) => (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>

                      <td>
                        <Input
                          value={row.level}
                          required
                          type="text"
                          onChange={(e: any) =>
                            handleChange(index, "level", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Input
                          value={row.part_number}
                          required
                          onChange={(e) =>
                            handleChange(index, "part_number", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Input
                          value={row.product_description}
                          required
                          onChange={(e) =>
                            handleChange(
                              index,
                              "product_description",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Input
                          value={row.qty_per_parent}
                          required
                          onKeyDown={(e) => {
                            if (["E", "e", "-", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          type="number"
                          onChange={(e: any) =>
                            handleChange(
                              index,
                              "qty_per_parent",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Select
                          value={row?.uom}
                          required
                          onChange={(_, newValue) =>
                            handleChange(index, "uom", newValue)
                          }
                        >
                          {unitOptions?.map((option: any, index: number) => (
                            <Option key={index} value={option?.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>
                        <Input
                          value={row.immediate_parent}
                          required
                          onChange={(e: any) =>
                            handleChange(
                              index,
                              "immediate_parent",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Input
                          value={row.excess_tolerance}
                          required
                          onKeyDown={(e) => {
                            if (["E", "e", "-", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          type="number"
                          onChange={(e) =>
                            handleChange(
                              index,
                              "excess_tolerance",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Input
                          value={row.material_standard_cost}
                          required
                          onKeyDown={(e) => {
                            if (["E", "e", "-", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          type="number"
                          onChange={(e) =>
                            handleChange(
                              index,
                              "material_standard_cost",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Input value={row.total_material_cost} />
                      </td>
                      <td>
                        <Select
                          value={row?.currency}
                          required
                          onChange={(_, newValue) =>
                            handleChange(index, "currency", newValue)
                          }
                        >
                          {currencyOptions?.map(
                            (option: any, index: number) => (
                              <Option key={index} value={option?.value}>
                                {option.label}
                              </Option>
                            )
                          )}
                        </Select>
                      </td>
                      <td>
                        <Input
                          value={row.labour_overhead_adder}
                          required
                          onKeyDown={(e) => {
                            if (["E", "e", "-", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          type="number"
                          onChange={(e: any) =>
                            handleChange(
                              index,
                              "labour_overhead_adder",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Input
                          value={row.profit_margin}
                          required
                          onKeyDown={(e) => {
                            if (["E", "e", "-", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          type="number"
                          onChange={(e) =>
                            handleChange(index, "profit_margin", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        {" "}
                        <Input value={row.sales_price} />
                      </td>
                      <td>
                        {" "}
                        <Input value={row.mrp} />
                      </td>
                      <td>
                        {" "}
                        <Input
                          value={row.discount}
                          required
                          onKeyDown={(e) => {
                            if (["E", "e", "-", "+"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          type="number"
                          onChange={(e: any) =>
                            handleChange(index, "discount", e.target.value)
                          }
                        />
                      </td>

                      {index > 0 && (
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            sx={{ borderRadius: 3, mt: 2.3 }}
                            size="sm"
                            variant="soft"
                            color="danger"
                            onClick={() => handleRemoveRow(index)}
                          >
                            Remove
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ borderRadius: 3 }}
              variant="plain"
              color="success"
              onClick={handleAddRow}
              startDecorator={<AddIcon />}
            >
              Add
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Button
              onClick={() => {
                navigate("/dashboard/bom_dashboard");
              }}
              variant="outlined"
              size="sm"
              disabled={loading}
              sx={{ borderRadius: 3 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              loading={loading}
              sx={{ borderRadius: 3, ml: 1 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddBOM;
