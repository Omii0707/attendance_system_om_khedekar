import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ role }) => {
  const [name, setName] = useState("");
  const [rollno, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (userType == "Admin" && secretkey != "Omii") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();
      Axios.post("http://localhost:3000/auth/signup", {
        name,
        email,
        password,
        role,
        secretkey,
      })
        .then((response) => {
          if (response.data.status) {
            navigate("/login");
            alert("Successfully Registered");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {role} Student Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Full Name:
            </label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Roll Number:
            </label>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollNo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Signup
          </button>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
