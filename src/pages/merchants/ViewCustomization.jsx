import React, { useState, useEffect } from "react";
import MerchantNav from "../../components/MerchantNav";
import axios from "axios";

const ViewCustomization = () => {
  const [customizedProducts, setCustomizedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const merchant = JSON.parse(localStorage.getItem("merchant"));
    const merchantId = merchant.merchant.id;

    axios
      .get(`http://localhost:8080/customizedProduct/get/${merchantId}`)
      .then((response) => {
        setCustomizedProducts(response.data.customizedProduct);
      })
      .catch((error) => {
        console.error("Error fetching customized products:", error);
      });
  }, []);

  const acceptCustomizedProduct = (productId) => {
    axios
      .put(`http://localhost:8080/customizedProduct/${productId}/accept`)
      .then((response) => {
        // Remove the accepted product from the state
        setCustomizedProducts(
          customizedProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error accepting product:", error);
        setError("Error accepting product. Please try again.");
      });
  };

  const rejectCustomizedProduct = (productId) => {
    axios
      .put(`http://localhost:8080/customizedProduct/${productId}/reject`)
      .then((response) => {
        setCustomizedProducts(
          customizedProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error rejecting product:", error);
        setError("Error rejecting product. Please try again.");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MerchantNav />
      <div className="p-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          View Customization
        </h2>
        <div
          className="container mx-auto py-8 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://img.freepik.com/free-photo/still-life-business-roles-with-various-mechanism-pieces_23-2149352652.jpg?t=st=1714450617~exp=1714454217~hmac=7e50f4f263c1bd9307cedd0b3935c6b29195661820cfe8a49fe1381e6f279690&w=900")`,
          }}
        >
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
                            product.approved ? "text-green-600" : "text-red-600"
                          }
                        >
                          {product.approved ? "Approved" : "Rejected"}
                        </span>
                      </p>
                      <div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => acceptCustomizedProduct(product.id)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 mr-2"
                          >
                            ACCEPT
                          </button>
                          <button
                            onClick={() => rejectCustomizedProduct(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                          >
                            REJECT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomization;
