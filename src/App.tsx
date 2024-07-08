import { Routes, Route } from "react-router-dom";
import SignIn from "./Components/Auth/Signin";
import SignUp from "./Components/Auth/Singup";
import Dashboard from "./Components/Dashboard";
import Page404 from "./Components/Page404";
import MyProfile from "./Components/Profile";
import AddRole from "./Components/Usermanagement/Role/AddRole";
import AddPermission from "./Components/Usermanagement/Role/AddPermission";
import RoleAssignByAdmin from "./Components/Usermanagement/Role/RoleAssignAdmin";
import RoleAssignByDeveloper from "./Components/Usermanagement/Role/RoleAssignDev";
import CompanyLogo from "./Components/Usermanagement/CompanyLogo";
import AddUserByAdmin from "./Components/Usermanagement/UserManager/AddUser";
import UserDashboard from "./Components/Usermanagement/UserManager/UserDashboard";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import VerifyOTP from "./Components/Auth/VerifyOTP";
import ResetPassword from "./Components/Auth/ResetPassword";
import AddCustomer from "./Components/Customer/AddCustomer";
import CustomerDashboard from "./Components/Customer";
import AddBOM from "./Components/BOM/AddBOM";
import BomDashboard from "./Components/BOM";
import ApprovedPage from "./Components/BOM/Approval";
import APIGateway from "./Components/APIGateway";
import WebHook from "./Components/Webhook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
       <Route path="/signup" element={<SignUp />} /> 
      <Route path="/forget_password" element={<ForgetPassword />} />
      <Route path="/verify_otp" element={<VerifyOTP />} />
      <Route path="/reset_password" element={<ResetPassword />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/profile" element={<MyProfile />} />
        <Route path="/dashboard/Apigateway" element={<APIGateway />} />
        <Route path="/dashboard/webhook" element={<WebHook />} />
        <Route path="/dashboard/sales" element={<MyProfile />} />
        <Route path="/dashboard/hr" element={<MyProfile />} />
        <Route path="/dashboard/bom_dashboard" element={<BomDashboard />} />
        <Route path="/dashboard/add_bom" element={<AddBOM />} />
        <Route path="/dashboard/bom_approval" element={<ApprovedPage />} />
        <Route path="/dashboard/supply_chain" element={<MyProfile />} />
        <Route path="/dashboard/executive" element={<MyProfile />} />
        <Route path="/dashboard/management" element={<MyProfile />} />
        <Route path="/dashboard/masters" element={<MyProfile />} />
        <Route path="/dashboard/add_customer" element={<AddCustomer />} />
        <Route
          path="/dashboard/customer_dashboard"
          element={<CustomerDashboard />}
        />
        <Route path="/dashboard/company_logo" element={<CompanyLogo />} />
        <Route path="/dashboard/add_role" element={<AddRole />} />
        <Route path="/dashboard/add_permission" element={<AddPermission />} />
        <Route path="/dashboard/add_user_admin" element={<AddUserByAdmin />} />
        <Route path="/dashboard/user_dashboard" element={<UserDashboard />} />
        <Route
          path="/dashboard/role_assign_admin"
          element={<RoleAssignByAdmin />}
        />
        <Route
          path="/dashboard/role_assign_dev"
          element={<RoleAssignByDeveloper />}
        />
      </Route>
    </Routes>
  );
}

export default App;
