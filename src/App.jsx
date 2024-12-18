import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/header";
import Footer from "./Component/footer";
import HomePage from "./Pages/HomePage";
import BusinessesPage from "./Pages/BusinessesPage";
import AboutPage from "./Pages/AboutPage";
import RegisterPage from "./Pages/RegisterPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
