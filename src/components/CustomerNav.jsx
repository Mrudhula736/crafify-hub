import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const CustomerNav = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/customerHome" className="text-white text-2xl font-bold" style={{"fontSize":"30px"}}>CUSTOMER</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/customerViewProducts" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>View Products</Link>
          </li>
          <li>
            <Link to="/orders" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>Orders</Link>
          </li>
          <li>
            <Link to="/customized-products" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>Customized Products</Link>
          </li>
          <li>
            <Link to="/view-customized-orders" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>View Customized Orders</Link>
          </li>
          <li>
            <Link to="/view-merchants" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>View Merchants</Link>
          </li>
          <li>
            <Link to="/make-payment" className="text-white hover:text-gray-300"style={{"fontSize":"18px"}}>Make Payment</Link>
          </li>
          <li>
            <Link to="/" className="text-white hover:text-gray-300" style={{"fontSize":"18px"}}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CustomerNav;
