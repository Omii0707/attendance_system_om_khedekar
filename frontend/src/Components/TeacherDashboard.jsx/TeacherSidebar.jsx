import React from "react";
import { NavLink } from "react-router-dom";

const TeacherSidebar = () => {
  return (
    <>
      <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
        <div className="bg-teal-600 h-12 flex items-center justify-center">
          <h3 className="text-2xl text-center font-pacific">ATTENDANCE</h3>
        </div>
        <div className="px-4">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : "  "
              } flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
            end
          >
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/leaves"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : "  "
              } flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
          >
            <span>Attendance List</span>
          </NavLink>
          <NavLink
            to="/admin/employees"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : "  "
              } flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
          >
            <span>Students List</span>
          </NavLink>
          {/* 
          <NavLink
            to="/admin/departments"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : "  "
              } flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
          >
            <span>Departments</span>
          </NavLink> */}

          {/* <NavLink
            to="/admin/salary/add"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : "  "
              } flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
          >
            <span>Manage Users</span>
          </NavLink>
          <NavLink
            to="/admin"
            className="flex items-center space-x-4 block py-2.5 px-4 rounded"
          >
            <span>User Profiles</span>
          </NavLink> */}

          <NavLink
            to="/admin/setting"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : "  "
              } flex items-center space-x-4 block py-2.5 px-4 rounded`
            }
          >
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default TeacherSidebar;
