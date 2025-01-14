import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/header";
import Footer from "./Component/footer";
import HomePage from "./Pages/HomePage";
import BusinessesPage from "./Pages/BusinessesPage";
import AboutPage from "./Pages/AboutPage";
import RegisterPage from "./Pages/RegisterPage";
import BusinessDetailsPage from "./Pages/BusinessDetailsPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import PasswordResetPage from "./Pages/PasswordResetPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/business/:businessId" element={<BusinessDetailsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
