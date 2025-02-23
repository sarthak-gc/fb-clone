import axios, { AxiosError } from "axios";

const environment = import.meta.env.VITE_API_ENVIRONMENT;
const API_URL =
  environment === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_API_URL;

enum Gender {
  Male = "male",
  zale = "female",
  Other = "other",
}

interface RegistrationDataI {
  firstName: string;
  lastName: string;
  birthday: Date | null;
  email: string;
  password: string;
  gender: Gender;
}

export const handleRegistration = async (data: RegistrationDataI) => {
  console.log(API_URL);

  console.log("Data : ", data);
  console.log("Registration Successful");
  const response = await axios.get(`${API_URL}/user/register`, {
    data,
  });
  try {
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(error?.response?.data.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};
