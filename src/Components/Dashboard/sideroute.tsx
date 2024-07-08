import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PeopleIcon from "@mui/icons-material/People";
import LinkIcon from "@mui/icons-material/Link";
import HailIcon from "@mui/icons-material/Hail";
import APIGateway from "../APIGateway";
import WebhookIcon from '@mui/icons-material/Webhook';


export const basicRoute = [
  {
    name: "Dashboard",
    icon: <HomeRoundedIcon />,
    link: "/dashboard",
    role: "admin",
  },
  // {
  //   name: "Sales",
  //   icon: <TrendingUpIcon />,
  //   role: "sales",
  //   subRoute: [
  //     {
  //       name: "Customers",
  //       link: "customer_dashboard",
  //     },
  //     {
  //       name: "Customer Proposal",
  //       link: "/dashboard/hr",
  //     },
  //     {
  //       name: "Quotation Approval",
  //       link: "bom_approval",
  //     },
  //   ],
  // },
  // {
  //   name: "Manufacture",
  //   icon: <PrecisionManufacturingIcon />,
  //   role: "manufacture",
  //   subRoute: [
  //     {
  //       name: "BOM",
  //       link: "bom_dashboard",
  //     },
  //   ],
  // },
  // {
  //   name: "HR",
  //   icon: <PeopleIcon />,
  //   link: "/dashboard/hr",
  //   role: "hr",
  // },
  // {
  //   name: "Supply Chain",
  //   icon: <LinkIcon />,
  //   link: "/dashboard/supply_chain",
  //   role: "supply_chain",
  // },
  // {
  //   name: "Management",
  //   icon: <ManageAccountsIcon />,
  //   link: "/dashboard/management",
  //   role: "general_management",
  // },
   {
    name: "API Gateway",
    icon: <ManageAccountsIcon />,
    link: "/dashboard/Apigateway",
    role: "admin",
  },
  {
    name: "Webhook",
    icon: <WebhookIcon  />,
    link: "/dashboard/webhook",
    role: "admin",
  },
  // {
  //   name: "Executive",
  //   icon: <HailIcon />,
  //   link: "/dashboard/executive",
  //   role: "executive",
  // },
  // {
  //   name: "Masters",
  //   icon: <AdminPanelSettingsIcon />,
  //   link: "/dashboard/masters",
  //   role: "master",
  // },

  {
    name: "User Manager",
    icon: <GroupAddIcon />,
    role: "admin",
    subRoute: [
      // {
      //   name: "Company Logo",
      //   link: "company_logo",
      // },
      {
        name: "User Management",
        link: "user_dashboard",
      },
      {
        name: "Role & Permission",
        link: "role_assign_admin",
      },
      // {
      //   name: "<Developer/>",
      //   link: "role_assign_dev",
      // },
    ],
  },
];
