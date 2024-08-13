import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
