import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Wrap everything with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="restaurant" element={<RestaurantPage />} />
          <Route path="restaurant/:id" element={<MenuPage />} />
          <Route path="cart" element={<CartPage />} />  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

