import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const MerchantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login/merchant", {
        email,
        password,
      });
  
      if (response && response.data) {
        console.log("Login successful:", response.data);
        toast.success(response.data.msg, { autoClose: 6000 });
        localStorage.setItem("merchant", JSON.stringify(response.data));
        navigate("/merchantHome");
      } else {
        // Handle unexpected response
        console.error("Unexpected response:", response);
        toast.error(response.data.msg, { autoClose: 6000 });
        setError("An unexpected error occurred.");
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again later.", { autoClose: 6000 });
      setError("An error occurred during login.");
    }
  };
  

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/top-view-origami-craft-paint-tube-paintbrush-straw-colored-paper_23-2148188422.jpg?t=st=1713330364~exp=1713333964~hmac=9cf94f4df3d6e83c3bb9ba5e7ae3d8d13f104d4ba5d46b21655dc51ef9cea4ab&w=900')",
      }}
    >
      <div className="text-center">
      <h2
    className="text-3xl font-extrabold text-blue-500 mb-4"
    style={{ fontSize: "40px", color: "#512DA8" }} 
  >
          Welcome to Craftify Hub
        </h2>
        <p className="text-black-200 mb-8" style={{"font-size":"28px"}}>
          Where creativity meets craftsmanship
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center" style={{"font-size":"24px"}}>
          Merchant Login
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700" style={{"font-size":"20px"}}
            >
              Email address <span className="text-red-800">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{"font-size":"18px"}}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700" style={{"font-size":"20px"}}
            >
              Password<span className="text-red-800">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{"font-size":"20px"}}
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/merchantRegister"
            className="font-medium text-2xl text-indigo-600 hover:text-indigo-500"
          >
            create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MerchantLogin;
