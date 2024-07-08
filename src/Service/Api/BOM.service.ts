import apiInstance from "..";

class BOMApi {
  getbom = async (id: number, skip: number, limit: number) => {
    return await apiInstance.get<any>(
      `/api/getbom?id=${id}&skip=${skip}&limit=${limit}`
    );
  };

  getbomnumber = async () => {
    return await apiInstance.get<any>(`/api/getbomnumber`);
  };

  getallcustomers = async (id: number) => {
    return await apiInstance.get<any>(`/api/getallcustomers?id=${id}`);
  };

  addbom = async (payload: any) => {
    return await apiInstance.post<any>(`/api/addbom`, payload);
  };

  editbom = async (id: number, payload: any) => {
    return await apiInstance.patch<any>(`/api/editbom?id=${id}`, payload);
  };

  deletesinglebom = async (id: number) => {
    return await apiInstance.post<any>(`/api/deletesinglebom?id=${id}`);
  };

  deleteallbom = async (payload: any) => {
    return await apiInstance.post<any>(`/api/deleteallbom`, payload);
  };

  approval = async (payload: any) => {
    return await apiInstance.post<any>(`/api/approval`, payload);
  };
}

export default new BOMApi();
