import React from "react";
import CustomerNav from "../../components/CustomerNav";

const CustomerHome = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomerNav />
      <div class = "bg-cover bg-center h-64"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/welcome-gradient-banner_361591-1358.jpg?t=st=1714193891~exp=1714197491~hmac=fe3f1decce46bc7f009637e39f85e04463e0943af6d703cde14a75b953816cf9&w=900')",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container mx-auto py-8">
        <center>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center" style={{"fontSize":"35px"}}>
          Welcome to Your Dashboard
        </h2>
        </center>
        <p className="text-black-600 mb-6" style={{"fontSize":"28px"}}>
          Explore the various features of our platform:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2"style={{"fontSize":"20px"}}>
              View Products
            </h5>
            <p className="text-gray-600">
              Browse through our wide range of products and find what you need.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2" style={{"fontSize":"20px"}}>Orders</h5>
            <p className="text-gray-600">
              View your past orders and track current ones.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2" style={{"fontSize":"20px"}}>
              Customized Products
            </h5>
            <p className="text-gray-600">
              Explore customized products tailored just for you.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2" style={{"fontSize":"20px"}}>
              View Merchants
            </h5>
            <p className="text-gray-600">
              Discover new merchants and their offerings.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2" style={{"fontSize":"20px"}}>
              Make Payment
            </h5>
            <p className="text-gray-600">
              Complete your transactions securely and conveniently.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2" style={{"fontSize":"20px"}}>
              View Customized Orders
            </h5>
            <p className="text-gray-600">
              Track your customized orders and their progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
