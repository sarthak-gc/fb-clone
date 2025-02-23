export enum Gender {
  Male = "male",
  zale = "female",
  Other = "other",
}

export interface RegistrationDataI {
  firstName: string;
  lastName: string;
  birthday: Date | null;
  email: string;
  password: string;
  gender: Gender;
}

export interface RegistrationStoreI {
  firstName: string;
  lastName: string;
  birthday: Date | null;
  email: string;
  password: string;
  gender: Gender;

  setRegistrationData: (
    target:
      | "firstName"
      | "lastName"
      | "birthday"
      | "email"
      | "password"
      | "gender",
    value: string | Date | Gender | null
  ) => void;
}
