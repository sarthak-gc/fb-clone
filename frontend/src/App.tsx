import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/Registration";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<RegistrationPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
    </Routes>
  );
};

export default App;
