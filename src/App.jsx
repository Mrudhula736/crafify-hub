import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRegister from "./pages/customers/CustomerRegister";
import CustomerLogin from "./pages/customers/CustomerLogin";
import MerchantLogin from "./pages/merchants/MerchantLogin";
import Home from "./components/Home";
import CustomerHome from "./pages/customers/CustomerHome";
import MerchantHome from "./pages/merchants/MerchantHome";
import AddProduct from "./pages/merchants/AddProduct";
import ViewProduct from "./pages/merchants/ViewProduct";
import CustomerViewProducts from "./pages/customers/CustomerViewProducts";
import ViewCustomization from "./pages/merchants/ViewCustomization";
import ViewOrders from "./pages/merchants/ViewOrders";
import ViewCustomers from "./pages/merchants/ViewCustomers";
import ViewPayments from "./pages/merchants/viewPayments";
import MerchantRegister from "./pages/merchants/MerchantRegister";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MerchantChat from "./pages/merchants/MerchantChat";
import CustomerViewMerchants from "./pages/customers/CustomerViewMerchants";
import CustomerChat from "./pages/customers/CustomerChat";
import AddCustomizedProduct from "./pages/customers/AddCustomizedProduct";
import ViewCustomizedProducts from "./pages/customers/ViewCustomizedProducts";
import CustomerMakePayments from "./pages/customers/CustomerMakePayments";
import CustomerViewOrders from "./pages/customers/CustomerViewOrders";
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/customerRegister" element={<CustomerRegister />} />
        <Route path="/customerLogin" element={<CustomerLogin />} />
        <Route path="/customerHome" element={<CustomerHome />} />
        <Route
          path="/customerViewProducts"
          element={<CustomerViewProducts />}
        />
        <Route path="/Customized-products" element={<AddCustomizedProduct/>} />
        <Route path="/view-merchants" element={<CustomerViewMerchants />} />
        <Route path="/customer/chat/:receiverId" element={<CustomerChat />} />
        <Route path="/view-customized-orders" element={<ViewCustomizedProducts />} />
        <Route path="/make-payment" element={<CustomerMakePayments />} />
        <Route path="/orders" element={<CustomerViewOrders />} />





        <Route path="/merchantRegister" element={<MerchantRegister />} />
        <Route path="/merchantLogin" element={<MerchantLogin />} />
        <Route path="/merchantHome" element={<MerchantHome />} />
        <Route path="/add-products" element={<AddProduct />} />
        <Route path="/view-products" element={<ViewProduct />} />
        <Route
          path="/view-customization-requests"
          element={<ViewCustomization />}
        />
        <Route path="/view-orders" element={<ViewOrders />} />
        <Route path="/view-customers" element={<ViewCustomers />} />
        <Route path="/view-payments" element={<ViewPayments />} />
        <Route path="/chat/:receiverId" element={<MerchantChat />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
