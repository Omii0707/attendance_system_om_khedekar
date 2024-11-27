import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Admin from "./Components/Admin";
import Teacher from "./Components/Teacher";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />}></Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<Teacher />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
