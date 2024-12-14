import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerNav from "../../components/CustomerNav";
import { toast } from "react-toastify";

function AddCustomizedProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    quantity: "",
    image: null,
    specifications: {},
  });
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState("");

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get("http://localhost:8080/merchant");
        console.log("Merchants:", response.data.merchants);
        setMerchants(response.data.merchants);
        if (response.data.merchants.length > 0) {
          setSelectedMerchantId(response.data.merchants[0].id.toString());
        }
      } catch (error) {
        console.error("Error fetching merchants:", error);
      }
    };
    fetchMerchants();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMerchantChange = (e) => {
    setSelectedMerchantId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customer = JSON.parse(localStorage.getItem("customer"));
      if (!customer || !customer.customer) {
        console.error("Customer data is not available in local storage.");
        return;
      }
      const customerId = customer.customer.id;

      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productDescription", formData.productDescription);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("customerId", customerId);
      formDataToSend.append("merchantId", selectedMerchantId);
      Object.entries(formData.specifications).forEach(([key, value]) => {
        formDataToSend.append(`specifications[${key}]`, value);
      });

      const response = await axios.post(
        `http://localhost:8080/customizedProduct/${customerId}/customized/${selectedMerchantId}`,
        formDataToSend
      );
      console.log("Product added:", response.data);
      toast.success(response.data.msg);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(response.data.msg);
    }
  };

  return (
    <div>
      <CustomerNav />
      <div
        className="container mx-auto py-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-photo/still-life-business-roles-with-various-mechanism-pieces_23-2149352652.jpg?t=st=1714023257~exp=1714026857~hmac=0efd7c58f40cb1d24785579c8f51c5906e40137c2afac642656f9a5aaa397bfd&w=900")`,
        }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-lg relative mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-black-900" style={{"fontSize":"30px"}}>
                Add Customized Product
              </h2>
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-black-700" style={{"fontSize":"20px"}}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" style={{"fontSize":"18px"}}
                />
              </div>

              <div>
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium text-black-700" style={{"fontSize":"20px"}}
                >
                  Product Description
                </label>
                <textarea
                  name="productDescription"
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" style={{"fontSize":"18px"}}
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-black-700" style={{"fontSize":"20px"}}
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" style={{"fontSize":"18px"}}
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-black-700" style={{"fontSize":"20px"}}
                >
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" style={{"fontSize":"20px"}}
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700" style={{"fontSize":"20px"}}
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" style={{"fontSize":"18px"}}
                />
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold">Specifications</h3>
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {key}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specifications: {
                            ...formData.specifications,
                            [key]: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Key (e.g., Color)"
                    name="key"
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., Red)"
                    name="value"
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const key = e.target.form.key.value.trim();
                      const value = e.target.form.value.value.trim();
                      if (key && value) {
                        setFormData({
                          ...formData,
                          specifications: {
                            ...formData.specifications,
                            [key]: value,
                          },
                        });
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="merchant"
                  className="block text-sm font-medium text-black-700" style={{"fontSize":"20px"}}
                >
                  Select Merchant
                </label>
                <select
                  id="merchant"
                  value={selectedMerchantId}
                  onChange={handleMerchantChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {merchants.map((merchant) => (
                    <option key={merchant.id} value={merchant.id}>
                      {merchant.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{"fontSize":"20px"}}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomizedProduct;
