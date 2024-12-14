import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CustomerNav from '../../components/CustomerNav';
 
const CustomerViewMerchants = () => {
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {
        fetchMerchants();
    }, []);

    const fetchMerchants = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/merchant`);
            setMerchants(response.data.merchants);
        } catch (error) {
            console.error('Error fetching merchants:', error);
        }
    }
  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomerNav />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold text-black-800 mb-4 text-center" style={{"fontSize":"30px"}}>
          View Merchants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {merchants &&
            merchants.map((merchant) => (
              <div
                key={merchant.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {merchant.name}
                </h3>
                <p className="text-gray-600 mb-2">{merchant.email}</p>
                <Link
                  to={`/customer/chat/${merchant.id}`}
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

export default CustomerViewMerchants