import React, { useState, useEffect } from "react";
import axios from "axios";
import MerchantNav from '../../components/MerchantNav';

const ViewOrders = () => {
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const merchant = JSON.parse(localStorage.getItem("merchant"));
    const merchantId = merchant.merchant.id;

    axios
      .get(`http://localhost:8080/payment/merchant/${merchantId}/get`)
      .then((res) => {
        setOrders(res.data.Payments);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        toast.error(res.data.orders.msg);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <MerchantNav />
      <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center" style={{"fontSize":"30px"}}>Your Orders</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2" style={{"fontSize":"20px"}}>Order ID</th>
                <th className="px-4 py-2" style={{"fontSize":"20px"}}>Customer Name</th>
                <th className="px-4 py-2" style={{"fontSize":"20px"}}>Product Name</th>
                <th className="px-4 py-2" style={{"fontSize":"20px"}}>Product Image</th>
                <th className="px-4 py-2" style={{"fontSize":"20px"}}>Price</th>
                <th className="px-4 py-2" style={{"fontSize":"20px"}}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{order.customer.name}</td>
                    <td className="border px-4 py-2">
                      {order.product.productName}
                    </td>
                    <td className="border px-4 py-2 ">
                      <img
                        className="w-20 h-20 object-cover"
                        src={order.product.image}
                        alt={order.product.productName}
                      />
                    </td>
                    <td className="border px-4 py-2">{order.product.price}</td>
                    <td className="border px-4 py-2">
                      {order.product.quantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default ViewOrders;
