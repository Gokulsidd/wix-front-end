import * as React from "react";
import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Chip, Tooltip } from "@mui/joy";
import { toast } from "sonner";
import ConfirmDelete from "../../utility/confirm";
import { useNavigate } from "react-router-dom";
import BOMService from "../../Service/Api/BOM.service";
import BOMView from "./viewBOM";
import BlockIcon from "@mui/icons-material/Block";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function labelDisplayedRows({
  from,
  to,
  count,
}: {
  from: number;
  to: number;
  count: number;
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function BOMTable({
  rows,
  limit,
  setLimit,
  page,
  setPage,
  count,
  getbom,
  approvalPage,
  pathname,
}: any) {
  let navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [viewOpen, setViewOpen] = React.useState<any>({
    view: false,
    state: "",
  });
  const [delId, setDelId] = React.useState<any>(null);
  const [btnLoading, setBtnLoading] = React.useState<boolean>(false);

  const getLabelDisplayedRowsTo = () => {
    if (count === -1) {
      return (page + 1) * limit;
    }
    return limit === -1 ? count : Math.min(count, (page + 1) * limit);
  };

  const deleteallbom = async () => {
    setBtnLoading(true);
    await BOMService.deleteallbom(selected)
      .then((res: any) => {
        toast.success(res.message);
        getbom();
        setBtnLoading(false);
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setBtnLoading(false);
      });
  };

  const deletesinglebom = async () => {
    setBtnLoading(true);
    await BOMService.deletesinglebom(delId)
      .then((res: any) => {
        toast.success(res.message);
        setDelId(null);
        getbom();
        setBtnLoading(false);
      })
      .catch((err: any) => {
        setDelId(null);
        toast.error(err.response.data.message);
        setBtnLoading(false);
      });
  };

  const approval = async (bool: boolean, id: number) => {
    const payload = {
      id: id,
      isApproval: bool,
    };
    setBtnLoading(true);
    await BOMService.approval(payload)
      .then((res: any) => {
        toast.success(res.message);
        getbom();
        setBtnLoading(false);
      })
      .catch((err: any) => {
        setDelId(null);
        toast.error(err.response.data.message);
        setBtnLoading(false);
      });
  };

  const RowMenu = (props: any) => {
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreVertIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem
            onClick={() => {
              setViewOpen({ ...viewOpen, state: props?.props, view: true });
            }}
          >
            <VisibilityIcon />
            View
          </MenuItem>

          {pathname !== approvalPage ? (
            <>
              <MenuItem
                disabled={props.props?.isApproval === "Approved" && true}
                onClick={() => {
                  navigate("/dashboard/add_bom", { state: props.props });
                }}
              >
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem
                disabled={props.props?.isApproval === "Approved" && true}
                onClick={() => {
                  setDelId(props?.props?._id);
                  setOpen(true);
                }}
                color="danger"
              >
                <DeleteForeverIcon />
                Delete
              </MenuItem>
            </>
          ) : (
            props.props?.isApproval !== "Approved" && (
              <>
                <MenuItem
                  onClick={() => {
                    approval(true, props?.props?._id);
                  }}
                  color="success"
                >
                  <ThumbUpOffAltIcon />
                  Approve
                </MenuItem>
                <MenuItem
                  disabled={props.props?.isApproval === "Rejected" && true}
                  onClick={() => {
                    approval(false, props?.props?._id);
                  }}
                  color="danger"
                >
                  <ThumbDownOffAltIcon />
                  Reject
                </MenuItem>
              </>
            )
          )}
        </Menu>
      </Dropdown>
    );
  };

  let confirm = () => {
    if (delId) {
      deletesinglebom();
    } else {
      deleteallbom();
    }
  };

  return (
    <Box>
      <ConfirmDelete
        open={open}
        setOpen={setOpen}
        loading={btnLoading}
        deleteEvent={confirm}
      />
      <BOMView open={viewOpen} setOpen={setViewOpen} />
      <Sheet
        className="OrderTableContainer scroll-container"
        variant="outlined"
        sx={{
          width: "100%",
          border: "none",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              {pathname !== approvalPage && (
                <th
                  style={{
                    width: 48,
                    textAlign: "center",
                    padding: "12px 6px",
                  }}
                >
                  <Checkbox
                    size="sm"
                    indeterminate={
                      selected.length > 0 && selected.length !== rows.length
                    }
                    checked={selected.length === rows.length}
                    onChange={(event) => {
                      setSelected(
                        event.target.checked
                          ? rows.map((row: any) => row._id)
                          : []
                      );
                    }}
                    color={
                      selected.length > 0 || selected.length === rows.length
                        ? "primary"
                        : undefined
                    }
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </th>
              )}
              {selected.length > 1 && (
                <th style={{ width: 40, textAlign: "start" }}>
                  {" "}
                  <Tooltip
                    title="Delete All"
                    variant="solid"
                    placement="top-start"
                  >
                    <DeleteForeverIcon
                      color="warning"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setOpen(true);
                      }}
                    />
                  </Tooltip>
                </th>
              )}
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  BOM ID
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>BOM Date</th>
              {/* <th style={{ width: 140, padding: "12px 6px" }}>Customer</th> */}
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 80, padding: "12px 6px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rows, getComparator(order, "bom_no")).map(
              (row: any, index: number) => (
                <tr key={index}>
                  {pathname !== approvalPage && (
                    <td style={{ textAlign: "center", width: 120 }}>
                      <Checkbox
                        size="sm"
                        checked={selected.includes(row._id)}
                        color={
                          selected.includes(row._id) ? "primary" : undefined
                        }
                        onChange={(event) => {
                          setSelected((ids) =>
                            event.target.checked
                              ? ids.concat(row._id)
                              : ids.filter((itemId) => itemId !== row._id)
                          );
                        }}
                        slotProps={{
                          checkbox: { sx: { textAlign: "left" } },
                        }}
                        sx={{ verticalAlign: "text-bottom" }}
                      />
                    </td>
                  )}
                  {selected.length > 1 && (
                    <td>
                      <Typography level="body-xs"> </Typography>
                    </td>
                  )}
                  <td>
                    <Typography level="body-xs">{row?.bom_no}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.date}</Typography>
                  </td>
                 
                  <td>
                    <Typography level="body-xs">
                      {row.isApproval === "Pending" ? (
                        <Chip
                          variant="soft"
                          size="sm"
                          startDecorator={<AccessTimeIcon />}
                          color="warning"
                        >
                          {row.isApproval}
                        </Chip>
                      ) : row.isApproval === "Rejected" ? (
                        <Chip
                          variant="soft"
                          size="sm"
                          startDecorator={<BlockIcon />}
                          color="danger"
                        >
                          {row.isApproval}
                        </Chip>
                      ) : (
                        row.isApproval === "Approved" && (
                          <Chip
                            variant="soft"
                            size="sm"
                            startDecorator={<CheckIcon />}
                            color="success"
                          >
                            {row.isApproval}
                          </Chip>
                        )
                      )}
                    </Typography>
                  </td>

                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <RowMenu props={row} />
                    </Box>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Sheet>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pt: 2.5,
          justifyContent: "space-between",
        }}
      >
        <FormControl orientation="horizontal" size="sm">
          <FormLabel>Rows per page:</FormLabel>
          <Select
            onChange={(_, newValue: any) => {
              setLimit(parseInt(newValue));
              setPage(0);
            }}
            value={limit}
          >
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="sm"
            color="neutral"
            variant="outlined"
            disabled={page === 0}
            onClick={() => {
              setPage(page - 1);
            }}
            sx={{ bgcolor: "background.surface" }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography textAlign="center" sx={{ minWidth: 80 }}>
            {labelDisplayedRows({
              from: count === 0 ? 0 : page * limit + 1,
              to: getLabelDisplayedRowsTo(),
              count: count,
            })}
          </Typography>
          <IconButton
            size="sm"
            color="neutral"
            variant="outlined"
            disabled={
              count !== -1 ? page >= Math.ceil(count / limit) - 1 : false
            }
            onClick={() => {
              setPage(page + 1);
            }}
            sx={{ bgcolor: "background.surface" }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
