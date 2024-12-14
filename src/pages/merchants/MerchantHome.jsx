import React from 'react';
import MerchantNav from '../../components/MerchantNav';

const MerchantHome = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <MerchantNav/>
      <div className="container mx-auto py-8">
      <div class = "bg-cover bg-center h-64"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/welcome-gradient-banner_361591-1358.jpg?t=st=1714193891~exp=1714197491~hmac=fe3f1decce46bc7f009637e39f85e04463e0943af6d703cde14a75b953816cf9&w=900')",
          backgroundRepeat: "no-repeat",
        }}
      />
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center" style={{"font-size":"30px"}} >Welcome to Your Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2" style={{"fontSize":"20px"}}>Add Products</h5>
            <p className="text-gray-600">Add new products to your inventory.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2" style={{"fontSize":"20px"}}>View Products</h5>
            <p className="text-gray-600">View and manage your existing products.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2"style={{"fontSize":"20px"}}>View Customization Requests</h5>
            <p className="text-gray-600">See requests from customers for customizations.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2"style={{"fontSize":"20px"}}>View Orders</h5>
            <p className="text-gray-600">View and manage orders placed by customers.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2" style={{"fontSize":"20px"}}>View Payments</h5>
            <p className="text-gray-600">Track payments made by customers.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2"style={{"fontSize":"20px"}}>Logout</h5>
            <p className="text-gray-600">Logout from your merchant account.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantHome;
