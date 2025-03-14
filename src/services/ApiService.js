import axios from "axios";
import AuthStore from "../store/AuthStore";
import { isTokenExpired } from "../utils/JWTHelper";

class ApiService {
  #publicInstance = null;
  #protectedInstance = null;
  #baseURL = "";

  constructor(customPath = "") {
    this.#baseURL = `${import.meta.env.VITE_APP_API_BASE_URL}${customPath}`;
  }

  get baseURL() {
    return this.#baseURL;
  }

  #createPublicInstance() {
    return axios.create({
      baseURL: this.#baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  #createProtectedInstance() {
    const instance = axios.create({
      baseURL: this.#baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const accessToken = AuthStore.getState().credentials.token;
        
        // Kiểm tra token có tồn tại không
        if (!accessToken) {
          console.warn("No token available for authenticated request");
          return Promise.reject(new Error("No authentication token available"));
        }
        
        // Kiểm tra token có hết hạn không
        if (isTokenExpired(accessToken)) {
          console.warn("Authentication token has expired");
          AuthStore.getState().logout();
          return Promise.reject(new Error("Authentication token has expired"));
        }
        
        // Thêm token vào header
        config.headers.Authorization = `Bearer ${accessToken}`;
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.warn(`Authentication error: ${error.response.status}`);
          AuthStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  public() {
    if (!this.#publicInstance) {
      this.#publicInstance = this.#createPublicInstance();
    }
    return this.#publicInstance;
  }

  protected() {
    if (!this.#protectedInstance) {
      this.#protectedInstance = this.#createProtectedInstance();
    }
    return this.#protectedInstance;
  }
}

export default ApiService;
