import React from "react";
import TeacherSidebar from "./TeacherDashboard.jsx/TeacherSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./AdminDashboard.jsx/Navbar";

const Teacher = () => {
  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
};

export default Teacher;
