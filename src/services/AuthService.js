import ApiService from "./ApiService";

const authApi = new ApiService("/");

export const AuthLogin = async (email, password) => {
  const response = await authApi.public().post("/login", { email, password });
  return response;
};

export const EntityRegister = async (userData, role) => {
  const response = await authApi.public().post(`/register/${role}`, userData);
  return response;
};

export const SupplierRegister = async (userData) => {
  return await EntityRegister(userData, "supplier");
};

export const BuyerRegister = async (userData) => {
  return await EntityRegister(userData, "buyer");
};
