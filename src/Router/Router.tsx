import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../Pages/SignUp";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
