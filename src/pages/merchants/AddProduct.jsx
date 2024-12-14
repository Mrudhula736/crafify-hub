import React, { useState } from "react";
import MerchantNav from "../../components/MerchantNav";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get merchantId from localStorage
      const merchant = JSON.parse(localStorage.getItem("merchant"));
      const merchantId = merchant.merchant.id;
      // Create FormData object
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("image", image);

      // Make POST request to the API
      const res = await axios.post(
        `http://localhost:8080/product/${merchantId}`,
        formData
      );
      console.log("Product added successfully:", res.data);
      // Display success message
      toast.success("Product added successfully!", { autoClose: 5000 });
    } catch (error) {
      console.error("Error adding product:", error);
      // Display error message
      toast.error(
        "An error occurred while adding the product. Please try again later.",
        { autoClose: 5000 }
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MerchantNav />
      <div
        className="container mx-auto py-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-photo/scrapbooking-cards-with-decorative-elements-white-textured-backdrop_23-2147899191.jpg?t=st=1714450005~exp=1714453605~hmac=bb5e0d153feecf34b35090fd4428040a5715422a577230d1e162918a7030154c&w=900")`,
        }}
      >
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center"style={{"fontSize":"40px"}}>
            Add Product
          </h2>
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name" style={{"fontSize":"20px"}}
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"20px"}}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            {/* Description */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
                htmlFor="productDescription"
              >
                Description
              </label>
              <textarea
                id="productDescription"
                placeholder="Enter product description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"20px"}}
                value={productDescription}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            {/* Price */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
                htmlFor="price"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter product price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"20px"}}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            {/* Quantity */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Enter product quantity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"20px"}}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            {/* Product Image */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2" style={{"fontSize":"20px"}}
                htmlFor="image"
              >
                Product Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{"fontSize":"20px"}}
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{"fontSize":"20px"}}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
