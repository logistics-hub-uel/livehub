import { create } from "zustand";
import { AuthLogin } from "../services/AuthService";
import { parseJwtPayload } from "../utils/JWTHelper";

const initCredentials = {
  token: null,
  role: null,
  user_id: null,
  full_name: null,
  email: null,
};

const AuthStore = create((set, get) => ({
  credentials: initCredentials,
  login: async (email, password) => {
    let response = await AuthLogin(email, password);
    if (response.status === 200) {
      let { access_token } = response.data.data;
      let payload = parseJwtPayload(access_token);
      set({
        credentials: {
          token: access_token,
          role: payload.role,
          full_name: payload.full_name,
          email: payload.email,
          user_id: payload.user_id,
        },
      });
    } else {
      set({ credentials: initCredentials });
      throw new Error(response.data.message);
    }
  },
  logout: () => {
    set({ credentials: initCredentials });
  },
}));

export default AuthStore;
