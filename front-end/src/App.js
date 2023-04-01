import "./App.css";
import React from "react";
import Nav from "./components/nav";
// import Navsample from './components/navsample'
import Footer from "./components/footer";
import Signup from "./Pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerComponent from "./components/customercomponents";
import AdminComponent from "./components/admincomponent";
import Login from "./Pages/Login";
import AddProduct from "./ADMIN/addproduct";
import AddCategory from "./ADMIN/category";
import AddsubCategory from "./ADMIN/subcategory";
import VisitorHome from "./Pages/VisitorHome";
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
import CustomerProduct from './CUSTOMER/customerproductlist'
//import ProductList from './CUSTOMER/customerproductlist';
import Sample from "./ADMIN/sample";


function App() {
  return (
    <div className="App">
      <div >
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<AdminComponent />}>
              <Route path="/admin/home" element={<h1>Admin Home</h1>} />
              <Route path="/admin/products" element={<Sample />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route path="/admin/addcategory" element={<AddCategory />} />
              <Route path="/admin/viewcategory" element={<ViewCategory />} />
              <Route path="/admin/addsubcategory" element={<AddsubCategory />}/>
              <Route path="/admin/viewsubcategory" element={<ViewSubCategory />}/>
              <Route path="/admin/updateproduct" element={<h1>Update product Component</h1>}/>
              <Route path="/admin/updatecategory/:id" element={<UpdateCategory />}/>
              <Route path="/admin/updatesubcategory/:id" element={<UpdateSubCategory />}/>
              <Route path="/admin/profile" element={<AdminProfile />}/>
            </Route>
            <Route element={<CustomerComponent />}>
              <Route path="/customer/home" element={<VisitorHome />} />
              <Route path="/customer/products" element={<CustomerProduct/>} />
              <Route path="/customer/products/productdetails" element={<h1>Product Detail and Purchase Page</h1>}/>
              <Route path="/customer/cart" element={<h1>Product cart Page</h1>} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/changepassword" element={<Userchangepassword />}/>
            </Route>
            <Route path="/Pages/signup" element={<Signup />} />
            <Route path="/Pages/login" element={<Login />} />
            <Route path="/Pages/forgotpassword" element={<ForgotPassword />} />
            <Route path="/Pages/otpverification" element={<OtpVerification />}/>
            <Route path="/Pages/changepassword" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </div>
  );
}

export default App;
