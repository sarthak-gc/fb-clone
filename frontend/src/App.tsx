import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/Registration";
import VerifyOtp from "./pages/VerifyOtp";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<RegistrationPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
    </Routes>
  );
};

export default App;
