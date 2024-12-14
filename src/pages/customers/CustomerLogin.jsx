import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:8080/login/customer", {
        email,
        password,
      });

      if (res && res.data) {
        console.log("Login successful:", res.data);
        toast.success(res.data.msg, { autoClose: 6000 });
        localStorage.setItem("customer", JSON.stringify(res.data));
        navigate("/customerHome");
      } else {        
        console.error("Unexpected response:", res);
        toast.error(res.data.msg, { autoClose: 6000 });
        setError("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again later.", { autoClose: 6000 });
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/making-handmade-present-mom_1098-17018.jpg?t=st=1714127294~exp=1714130894~hmac=9a1ffea717154d976b249dbeac98a287fa427498cc583d133db5611e85c82e11&w=900')" }}>
      {/* <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white bg-opacity-75"> */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white" style={{"fontSize":"30px","color":"black"}}>WELCOME TO CRAFTIFY HUB</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="mt-2 text-center text-2xl text-black-600 font-bold" style={{"fontSize":"20px"}}>
            CUSTOMER LOGIN
          </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700" style={{"fontSize":"20px"}}>
                  Email address<span className="text-red-800">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{"fontSize":"18px"}}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700" style={{"fontSize":"20px"}}>
                  Password<span className="text-red-800">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{"fontSize":"20px"}}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{"fontSize":"20px"}}
                >
                  Login
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/customerRegister" className="font-medium text-2xl text-indigo-600 hover:text-indigo-500" style={{"fontSize":"20px"}}>
              create a new account
            </Link>
          </p>
          </div>
        </div>
      </div>
  )
}

export default CustomerLogin