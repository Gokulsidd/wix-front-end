import axios from "axios";
import { API_BASE_URL } from "./BaseURL";
import { clearAll } from "./Localstorage";
import { requestInterceptor, responseInterceptor } from "./interceptor";
import { getAuthToken } from "../utility";

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});
apiInstance.interceptors.request.use(requestInterceptor);
apiInstance.interceptors.response.use(
  (response: any) => responseInterceptor(response),
  (error: any) => {
    const accessToken = getAuthToken()
    if (error.response.status === 401 && accessToken) {
      clearAll();
      window.location.replace("/");
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);
export default apiInstance;
