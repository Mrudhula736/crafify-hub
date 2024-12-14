import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerNav from "../../components/CustomerNav";

const CustomerViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    const customerId = customer.customer.id;

    axios
      .get(`http://localhost:8080/payment/get/${customerId}`)
      .then((res) => {
        setOrders(res.data.Payments);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        toast.error(res.data.orders.msg);
      });
  }, []);

  return (
    <div
    className="bg-cover bg-center bg-no-repeat min-h-screen"
    style={{
      backgroundImage: `url("https://img.freepik.com/free-photo/box-market-electronic-ordering-shop-basket_1421-567.jpg?t=st=1714383833~exp=1714387433~hmac=9464a94e69f2331e266919f9f54053f91fc2e9eb80d5f9d44fa0a1bf49b52491&w=996")`,
    }}
  >
    <CustomerNav />
    <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center" style={{"fontSize":"35px"}}>Your Orders</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2"style={{"fontSize":"20px"}}>Order ID</th>
                <th className="px-4 py-2" style={{"fontSize":"20px"}}>Customer Name</th>
                <th className="px-4 py-2" style={{"fontSize":"20px"}}>Product Name</th>
                <th className="px-4 py-2"style={{"fontSize":"20px"}}>Product Image</th>
                <th className="px-4 py-2"style={{"fontSize":"20px"}}>Price</th>
                <th className="px-4 py-2"style={{"fontSize":"20px"}}>Quantity</th>
                <th className="px-4 py-2"style={{"fontSize":"20px"}}>Total</th>
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
                    <td className="border px-4 py-2">{order.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
);
};

export default CustomerViewOrders;
