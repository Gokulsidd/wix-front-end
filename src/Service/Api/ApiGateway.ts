import apiInstance from "..";

class Apigateway {
  getData = async () => {
    return await apiInstance.get<any>(`/api/scheduletask`);
  };

  getLogData = async () => {
    return await apiInstance.get<any>(`/api/gettasklog`);
  };
}

export default new Apigateway();
