import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MerchantNav from "../../components/MerchantNav";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/customer`);
      setCustomers(response.data.customer);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MerchantNav />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center" style={{"fontSize":"30px"}}>
          View Customers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers &&
            customers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {customer.name}
                </h3>
                <p className="text-gray-600 mb-2">{customer.email}</p>
                <Link
                  to={`/chat/${customer.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Chat
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCustomers;
