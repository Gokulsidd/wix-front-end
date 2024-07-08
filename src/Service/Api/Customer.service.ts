import apiInstance from "..";

class CustomerApi {
  addcustomers = async (payload: any) => {
    return await apiInstance.post<any>(`/api/addcustomers`, payload);
  };

  updatecustomers = async (id: number, payload: any) => {
    return await apiInstance.post<any>(
      `/api/updatecustomers?id=${id}`,
      payload
    );
  };

  deletecustomers = async (id: any) => {
    return await apiInstance.post<any>(`/api/deletecustomers?id=${id}`);
  };

  deleteallcustomers = async (payload:any) => {
    return await apiInstance.post<any>(`/api/deleteallcustomers`,payload);
  };

  getcustomers = async (id: number, skip: number, limit: number) => {
    return await apiInstance.get<any>(
      `/api/getcustomers?id=${id}&skip=${skip}&limit=${limit}`
    );
  };

}

export default new CustomerApi();
