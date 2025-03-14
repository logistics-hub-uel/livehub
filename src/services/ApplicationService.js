import ApiService from "./ApiService";

const applicationApi = new ApiService("/applications");

export const createApplication = async (applicationData) => {
  const response = await applicationApi.protected().post("", applicationData);
  return response.data;
};
