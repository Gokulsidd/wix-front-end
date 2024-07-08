import { getAuthData, getAuthToken } from "../utility";

export const requestInterceptor = async (config: any) => {
  let token = getAuthToken();
  let auth_data = getAuthData();
  if (token) {
    config.headers["Authorization"] = token;
    config.headers["Role"] = auth_data?.role;
    config.headers["Permission"] =JSON.stringify(auth_data?.permission);
    config.headers["Company_id"] = auth_data?.company_id;
    config.headers["Company_name"] = auth_data?.company_name;
    config.headers["Emp_id"] = auth_data?.emp_id;
    config.headers["Name"] = auth_data?.name;
    config.headers["Email"] = auth_data?.email;
  }
  return config;
};

export const responseInterceptor = (response: any) => {
  return response.data;
};
