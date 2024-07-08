import apiInstance from "..";

class AuthApi {
  signin = async (payload: any) => {
    return await apiInstance.post<any>(`/api/signin`, payload);
  };

  signup = async (payload: any) => {
    return await apiInstance.post<any>(`/api/signup`, payload);
  };

  forgetpassword = async (payload: any) => {
    return await apiInstance.post<any>(`/api/forgetpassword`, payload);
  };

  verifypassword = async (payload: any) => {
    return await apiInstance.post<any>(`/api/verifypassword`, payload);
  };

  resetpassword = async (payload: any) => {
    return await apiInstance.post<any>(`/api/resetpassword`, payload);
  };

  adminsignup = async (payload: any) => {
    return await apiInstance.post<any>(`/api/adminsignup`, payload);
  };

  adminsignupedit = async (payload: any, id: any) => {
    return await apiInstance.post<any>(
      `/api/adminsignupedit?id=${id}`,
      payload
    );
  };

  imageupload = async (payload: any, id: any) => {
    return await apiInstance.post<any>(`/api/imageupload?id=${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  mainiconupload = async (payload: any) => {
    return await apiInstance.post<any>(`/api/mainicon`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  getmainicon = async () => {
    return await apiInstance.get<any>(`/api/getmainicon`);
  };

  getheaderdetails = async (id: any) => {
    return await apiInstance.get<any>(`/api/getheaderdetails?id=${id}`);
  };
}

export default new AuthApi();
