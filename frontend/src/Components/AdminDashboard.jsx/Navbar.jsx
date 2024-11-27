import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
      <p>Welcome User</p>
      <button className="px-4 py-1 bg-teal-700">Logout</button>
    </div>
  );
};

export default Navbar;
