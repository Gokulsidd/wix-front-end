export const initialRow = {
  level: "",
  part_number: "",
  product_description: "",
  qty_per_parent: "",
  uom: "",
  immediate_parent: "",
  excess_tolerance: "",
  material_standard_cost: "",
  total_material_cost: "",
  currency: "",
  labour_overhead_adder: "",
  profit_margin: "",
  sales_price: "",
  mrp: "0",
  discount: "",
};

export const headersForBOM = [
  {
    title: "S.NO",
    width: 40,
    isPadMar: 0,
  },
  {
    title: "Level",
    width: 150,
  },
  {
    title: "Part Number",
    width: 150,
  },
  {
    title: "Product Description",
    width: 150,
  },
  {
    title: "Qty per Parent",
    width: 150,
  },
  {
    title: "UOM",
    width: 150,
  },
  {
    title: " Immediate Parent",
    width: 150,
  },
  {
    title: " Excess Tolerance (Material) %",
    width: 150,
  },
  {
    title: " Material Standard Cost",
    width: 150,
  },
  {
    title: "Total Material Cost",
    width: 150,
  },
  {
    title: "Currency",
    width: 150,
  },
  {
    title: "Labour & Overhead Adder %",
    width: 150,
  },
  {
    title: "Profit Margin %",
    width: 150,
  },
  {
    title: "Sales Price",
    width: 150,
  },
  {
    title: "MRP",
    width: 150,
  },
  {
    title: "Discount %",
    width: 150,
  },
];

export const unitOptions = [
  { value: "in", label: "Inch" },
  { value: "kg", label: "Kilogram" },
  { value: "each", label: "Each" },
  { value: "pcs", label: "Piece" },
  { value: "g", label: "Gram" },
  { value: "t", label: "Ton" },
  { value: "L", label: "Liter" },
  { value: "m", label: "Meter" },
  { value: "cm", label: "Centimeter" },
  { value: "ft", label: "Foot" },
  { value: "gal", label: "Gallon" },
];

export const currencyOptions = [{ value: "INR", label: "INR" }];

export const TMCCalculation = (newRows: any, index: number) => {
  const materialCost = parseFloat(newRows[index].material_standard_cost) || 0;
  const qty = parseFloat(newRows[index].qty_per_parent) || 0;
  const excessTol = parseFloat(newRows[index].excess_tolerance) || 0;
  return (materialCost * qty * (1 + excessTol / 100)).toFixed(2);
};

export const SalePriceCalculation = (newRows: any, index: number) => {
  const totMaterialCost = parseFloat(newRows[index].total_material_cost) || 0;
  const labourOverhead = parseFloat(newRows[index].labour_overhead_adder) || 0;
  const totOver = totMaterialCost * (labourOverhead / 100);
  const kl = totMaterialCost + totOver;

  const profit = parseFloat(newRows[index].profit_margin) || 0;
  const tn = kl * (profit / 100);
  const up = tn + kl;
  return up.toFixed(2);
};

export const MRPCalculation = (newRows: any, index: number) => {
  const salePrice = parseFloat(newRows[index].sales_price) || 0;
  const discountPercent = parseFloat(newRows[index].discount) || 0;
  let jk = salePrice / (1 - discountPercent / 100);
  return jk.toFixed(2);
};
