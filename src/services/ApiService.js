import axios from "axios";
import AuthStore from "../store/AuthStore";

class ApiClient {
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
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
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

export default ApiClient;
