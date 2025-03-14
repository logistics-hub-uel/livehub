import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initCredentials = {
  token: null,
  role: null,
  user_id: null,
  full_name: null,
  email: null,
};

const AuthStore = create(
  persist(
    (set, get) => ({
      credentials: initCredentials,
      setCredentials: (credentials) => {
        set({ credentials });
      },
      logout: () => set({ credentials: initCredentials }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default AuthStore;
