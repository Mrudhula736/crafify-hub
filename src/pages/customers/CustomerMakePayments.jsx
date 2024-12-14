import React, { useState} from "react";
import axios from "axios";
import CustomerNav from "../../components/CustomerNav";
import { toast } from "react-toastify";

const CustomerMakePayments = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productId = cart.length > 0 ? cart[0].productId : null;
  const price = cart.length > 0 ? cart[0].price : 0;
  const quantity = cart.length > 0 ? cart[0].quantity : 0;

  const customer = JSON.parse(localStorage.getItem("customer"));
  const customerId = customer ? customer.customer.id : null;

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/payment/make/${customerId}/${productId}`,
        {
          amount: price * quantity,
          cardholderName,
          cardNumber,
          expiryDate,
          cvv,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      toast.success(response.data.msg);
      localStorage.removeItem("cart");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error status:", error.response.status);
        console.error("Error message:", error.response.data.msg);
        toast.error(error.response.data.msg);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        toast.error("No response received from server");
      } else {
        console.error("Error making payment:", error.message);
        toast.error("Error making payment. Please try again later.");
      }
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomerNav />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/payment-information-concept-illustration_114360-2296.jpg?t=st=1714195546~exp=1714199146~hmac=e269708036f83b95510425a2b340ea0bc5c96b061dda58568e752eb9264c7cf5&w=740')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center" style={{"fontSize":"28px"}}>
            Make Payment
          </h2>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
            >
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              value={price * quantity}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"18px"}}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cardHolderName"
              className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
            >
              Card Holder Name:
            </label>
            <input
              type="text"
              id="cardHolderName"
              value={cardholderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"18px"}}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
            >
              Card Number:
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"18px"}}
            />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label
                htmlFor="expiryDate"
                className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
              >
                Expiry Date:
              </label>
              <input
                type="date"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YYYY"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"18px"}}
              />
            </div>
            <div className="w-1/2 ml-2">
              <label
                htmlFor="cvv"
                className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
              >
                CVV:
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"18px"}}
              />
            </div>
          </div>
          <center>
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{"fontSize":"20px"}}
            >
              Pay Now
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default CustomerMakePayments;
