import React from 'react';
import { Link } from 'react-router-dom'; 

const MerchantNav = () => {
  const handleLogout = () => {
    // Remove the merchantId item from localStorage
    localStorage.removeItem("merchant");
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/merchantHome" className="text-white text-2xl font-bold" style={{"fontSize":"25px"}}>MERCHANT</Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/add-products" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>Add Products</Link>
          </li>
          <li>
            <Link to="/view-products" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>View Products</Link>
          </li>
          <li>
            <Link to="/view-customization-requests" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>View Customization Requests</Link>
          </li>
          <li>
            <Link to="/view-orders" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>View Orders</Link>
          </li>
          <li>
            <Link to="/view-customers" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>View Customers</Link>
          </li>
          <li>
            <Link to="/view-payments" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>View Payments</Link>
          </li>
          <li>
            <Link to="/" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}} onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MerchantNav;
