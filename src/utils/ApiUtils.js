import AuthStore from "../store/AuthStore";
import { isTokenExpired } from "./JWTHelper";

export const getAuthToken = () => {
  const accessToken = AuthStore.getState().credentials.token;

  if (!accessToken) {
    throw new Error("No authentication token available");
  }

  if (isTokenExpired(accessToken)) {
    AuthStore.getState().logout();
    throw new Error("Authentication token has expired");
  }

  return accessToken;
};
