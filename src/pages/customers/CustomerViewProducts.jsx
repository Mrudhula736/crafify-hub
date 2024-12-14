import React, { useState, useEffect } from "react";
import CustomerNav from "../../components/CustomerNav";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product");
      setProducts(response.data.product);
      setLoading(false);
    } catch (error) {
      setError("Error fetching products");
      setLoading(false);
    }
  };

  const handleBuyProduct = (productId, price) => {
    console.log("Buy product with ID:", productId);
  
    // Simulate adding the product to the cart
    const cartItem = {
      productId: productId,
      price: price,
      quantity: 1, // Assuming adding one quantity for now
    };
  
    // Retrieve existing cart items from localStorage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the product already exists in the cart
    const existingCartItemIndex = existingCartItems.findIndex(
      (item) => item.productId === productId
    );
  
    if (existingCartItemIndex !== -1) {
      // If the product already exists in the cart, update its quantity
      existingCartItems[existingCartItemIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it
      existingCartItems.push(cartItem);
    }
  
    // Update the cart items in localStorage
    localStorage.setItem("cart", JSON.stringify(existingCartItems));
  
    // Optionally, you can display a success message or navigate to the cart page
    console.log("Product added to the cart:", cartItem);
  };
  
  return (
    <div
      className="bg-gray-100 min-h-screen"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/close-up-different-colorful-materials-table_23-2148271004.jpg?t=st=1714194536~exp=1714198136~hmac=746fd4c86c77754210c285d3282faf4b31420d91f9db630dade15b72fcc69cb1&w=900')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <CustomerNav />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold text-white mb-4 text-center" style={{"fontSize":"40px"}}>
          View Products
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <img className="w-80 h-50 object-cover mb-4 rounded-md"
                  src={product.image}
                  alt={product.productName}
                />
                <h3 className="text-black-600 mb-2">
                  PRODUCT NAME: {product.productName}
                </h3>
                <p className="text-black-600 mb-2">
                  PRODUCT DESCRIPTION: {product.productDescription}
                </p>
                <p className="text-black-600 mb-4">
                  QUANTITY: {product.quantity}
                </p>
                <p className="text-black-600 mb-4">AMOUNT: Rs.{product.price}</p>
                <center>
                  <button
                    onClick={() => handleBuyProduct(product.id, product.price)}
                    className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    <Link
                      to={{
                        pathname: "/make-payment",
                        state: {
                          productId: product.id,
                          price: product.price,
                          quantity: product.quantity
                        },
                      }}
                      className="text-white" style={{"fontSize":"18px"}}
                    >
                      Buy
                    </Link>
                  </button>
                </center>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerViewProducts;
