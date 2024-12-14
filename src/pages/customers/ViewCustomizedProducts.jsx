import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerNav from "../../components/CustomerNav";

const ViewCustomizedProducts = () => {
  const [customizedProducts, setCustomizedProducts] = useState([]);

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    const customerId = customer.customer.id;

    axios
      .get(`http://localhost:8080/customizedProduct/${customerId}`)
      .then((response) => {
        setCustomizedProducts(response.data.customizedProduct);
      })
      .catch((error) => {
        console.error("Error fetching customized products:", error);
      });
  }, []);

  // Function to delete a customized product
  const deleteCustomizedProduct = (productId) => {
    axios
      .delete(`http://localhost:8080/customizedProduct/${productId}`)
      .then((response) => {
        // Remove the deleted product from the state
        setCustomizedProducts(
          customizedProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error deleting customized product:", error);
      });
  };

  return (
    <div>
      <CustomerNav />
      <div className="p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {customizedProducts &&
              customizedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {product.productName}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      Description: {product.productDescription}
                    </p>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <p className="text-gray-700 mb-2">
                      Quantity: {product.specifications.quantity}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Price: {product.specifications.price}
                    </p>
                    {/* Mapping all specifications */}
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <p className="text-gray-700 mb-2" key={key}>
                          {key}: {value}
                        </p>
                      )
                    )}
                    <p className="text-gray-700 mb-2">
                      Status:{" "}
                      <span
                        className={
                          product.approved
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {product.approved ? "Approved" : "Pending"}
                      </span>
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => deleteCustomizedProduct(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomizedProducts;
