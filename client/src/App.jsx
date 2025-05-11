import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UserSignup from "./pages/UserSignup";
import AdminSignup from "./pages/AdminSignup";
import UserSignin from "./pages/UserSignin";
import AdminSignin from "./pages/AdminSignin";
import UserPurchases from "./pages/UserPurchases";
import AdminCourses from "./pages/AdminCourses";

function App() {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/signin/user" element={<UserSignin />} />
        <Route path="/signin/admin" element={<AdminSignin />} />
        <Route path="/user/purchases" element={<UserPurchases />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
      </Routes>
    </div>
  );
}

export default App;
