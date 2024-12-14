import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const MerchantRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/merchant", formData);
      console.log("Registration successful:", response.data);
      toast.success(response.data.msg, { autoClose: 6000 });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg, { autoClose: 6000 });
      } else {
        toast.error("An error occurred while processing your request.", { autoClose: 6000 });
      }
    }
  };
  
  

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/top-view-origami-craft-paint-tube-paintbrush-straw-colored-paper_23-2148188422.jpg?t=st=1713330364~exp=1713333964~hmac=9cf94f4df3d6e83c3bb9ba5e7ae3d8d13f104d4ba5d46b21655dc51ef9cea4ab&w=900')",
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-black " style={{"fontSize":"30px"}}>
          WELCOME TO CRAFTIFY HUB
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="mt-2 text-2xl text-center text-black-600 font-bold" style={{"fontSize":"20px"}}>
            MERCHANT REGISTER
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700" style={{"fontSize":"20px"}}
              >
                Name<span className="text-red-800">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{"fontSize":"18px"}}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700" style={{"fontSize":"20px"}}
              >
                Email address<span className="text-red-800">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{"fontSize":"20px"}}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700" style={{"fontSize":"20px"}}
              >
                Password<span className="text-red-800">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{"fontSize":"18px"}}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700" style={{"fontSize":"20px"}}
              >
                Mobile number<span className="text-red-800">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{"fontSize":"18px"}}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700" style={{"fontSize":"20px"}}
              >
                Address
              </label>
              <div className="mt-1">
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{"fontSize":"18px"}}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{"fontSize":"20px"}}
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/merchantLogin"
              className="font-medium text-2xl text-indigo-600 hover:text-indigo-500" style={{"fontSize":"20px"}}
            >
              login to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MerchantRegister;
