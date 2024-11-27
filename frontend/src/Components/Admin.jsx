import React from "react";
import AdminSidebar from "./AdminDashboard.jsx/AdminSidebar";
import Navbar from "./AdminDashboard.jsx/Navbar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
