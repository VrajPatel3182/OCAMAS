import "./App.css";
import React from "react";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Signup from "./Pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerComponent from "./components/customercomponents";
import AdminComponent from "./components/admincomponent";
import Login from "./Pages/Login";
import AddProduct from "./ADMIN/addproduct";
import ViewProduct from './ADMIN/productlist';
import ProductDetail from "./CUSTOMER/productDetail";
import AddCategory from "./ADMIN/category";
import AddsubCategory from "./ADMIN/subcategory";
import VisitorHome from "./Pages/VisitorHome";
import AdminHome from "./ADMIN/adminHome";
import CustomerProfile from "./CUSTOMER/customerProfile";
import ViewCategory from "./ADMIN/viewCategory";
import ViewSubCategory from "./ADMIN/viewSubCategory";
import AdminProfile from "./ADMIN/adminProfile";
import ForgotPassword from "./Pages/ForgotPassword";
import OtpVerification from "./Pages/OtpVerification";
import ChangePassword from "./Pages/ChangePassword";
import Userchangepassword from "./CUSTOMER/changepassword";
import UpdateCategory from "./ADMIN/updateCategory";
import UpdateSubCategory from "./ADMIN/updateSubCategory";
import Updateproduct from './ADMIN/updateProduct';
import CustomerHome from "./CUSTOMER/customerHome";
import CustomerAboutus from "./CUSTOMER/customerAboutus";
import CustomerContactus from "./CUSTOMER/customerContactus";
//import ProductList from './CUSTOMER/customerproductlist';
// import Sample from "./ADMIN/sample";
import Checkout from "./CUSTOMER/checkOut";
import Cart from "./CUSTOMER/Cart";
import MyOrders from "./CUSTOMER/MyOrders";

function App() {
  
  return (
    <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<AdminComponent />}>
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/products" element={<ViewProduct />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route path="/admin/addcategory" element={<AddCategory />} />
              <Route path="/admin/viewcategory" element={<ViewCategory />} />
              <Route path="/admin/addsubcategory" element={<AddsubCategory />}/>
              <Route path="/admin/viewsubcategory" element={<ViewSubCategory />}/>
              <Route path="/admin/updateproduct/:id" element={<Updateproduct />}/>
              <Route path="/admin/updatecategory/:id" element={<UpdateCategory />}/>
              <Route path="/admin/updatesubcategory/:id" element={<UpdateSubCategory />}/>
              <Route path="/admin/profile" element={<AdminProfile />}/>
            </Route>
            <Route element={<CustomerComponent />}>
              <Route path="/customer/home" element={<CustomerHome />} />
              
              <Route path="/customer/MyOrders" element={<MyOrders />} />
              <Route path="/customer/aboutus" element={<CustomerAboutus />} />
              <Route path="/customer/contactus" element={<CustomerContactus />} />
              <Route path="/customer/productdetails/:id" element={<ProductDetail/>}/>
              {/* <Route path="/customer/cart/:id:name" element={<CustomerCart/>} /> */}
              <Route path="/customer/Cart" element={<Cart />} />
              <Route path="/customer/checkOut" element={<Checkout />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/changepassword" element={<Userchangepassword />}/>
              
            </Route>
              <Route path="/" element={<VisitorHome />} />
              <Route path="/Pages/signup" element={<Signup />} />
              <Route path="/Pages/login" element={<Login />} />
              <Route path="/Pages/forgotpassword" element={<ForgotPassword />} />
              <Route path="/Pages/otpverification" element={<OtpVerification />}/>
              <Route path="/Pages/changepassword" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
