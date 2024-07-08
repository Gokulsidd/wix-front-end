import apiInstance from "..";

class UserMgtApi {
  getUsers = async (id: any, payload: any) => {
    return await apiInstance.post<any>(`/api/getUsers?id=${id}`, payload);
  };

  deleteallusers = async (payload: any) => {
    return await apiInstance.post<any>(`/api/deleteallusers`, payload);
  };

  deleteuser = async (id: any) => {
    return await apiInstance.post<any>(`/api/deleteuser?id=${id}`);
  };

  getpermission = async () => {
    return await apiInstance.get<any>(`/api/getpermission`);
  };

  getrole = async () => {
    return await apiInstance.get<any>(`/api/getrole`);
  };

  getuserrole = async () => {
    return await apiInstance.get<any>(`/api/getuserrole`);
  };

  searchbyroleid = async (id: any) => {
    return await apiInstance.get<any>(`/api/searchbyroleid?id=${id}`);
  };

  RBAC = async (payload: any, id: any) => {
    return await apiInstance.post<any>(`/api/RBAC?id=${id}`, payload);
  };

  RBACupdate = async (payload: any, id: any) => {
    return await apiInstance.post<any>(`/api/RBACupdate?id=${id}`, payload);
  };
}

export default new UserMgtApi();
