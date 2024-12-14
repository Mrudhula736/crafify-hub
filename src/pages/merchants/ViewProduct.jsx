import React, { useState, useEffect } from 'react';
import MerchantNav from '../../components/MerchantNav';
import axios from 'axios';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      const merchantId = merchant.merchant.id;
      const response = await axios.get(`http://localhost:8080/product/${merchantId}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to handle product deletion
  const handleDelete = async (id) => {
    try {
      
      await axios.delete(`http://localhost:8080/product/${id}`);
      // Remove the deleted product from the local state
      setProducts(products.filter(product => product.id !== id));
      console.log('Deleted product with ID:', id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <MerchantNav/>
      <div
        className="container mx-auto py-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-vector/hobby-big-set-with-art-handicraft-symbols-flat-isolated-vector-illustration_1284-71532.jpg?t=st=1714450359~exp=1714453959~hmac=c527f771acd04b57df9607ee7fa7907f470cd48b9759c6b355d73738a7df0e03&w=900")`,
        }}
      >
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">View Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <img src={product.image} alt={product.name} className="w-full h-45 object-cover mb-4 rounded-md" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.productName}</h3>
              <p className="text-gray-600 mb-2">{product.productDescription}</p>
              <p className="text-gray-600 mb-4">Rs.{product.price}</p>
              <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ViewProduct;
