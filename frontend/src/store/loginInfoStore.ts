import { create } from "zustand";
import { LoginInfoStoreI } from "../types";
export const loginInfoStore = create<LoginInfoStoreI>((set) => ({
  email: "",
  password: "",

  setLoginInfo: (target, value) => {
    set((state) => ({ ...state, [target]: value }));
  },
}));
