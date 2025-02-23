import { create } from "zustand";
import { Gender, RegistrationStoreI } from "../types";

export const userRegistrationStore = create<RegistrationStoreI>((set) => ({
  firstName: "",
  lastName: "",
  birthday: null,
  gender: Gender.Male,
  email: "",
  password: "",

  setRegistrationData: (target, value) => {
    set((state) => ({ ...state, [target]: value }));
  },
}));
