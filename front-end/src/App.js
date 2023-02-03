import './App.css';
import React from 'react';
import Nav from './components/nav';
import Footer from './components/footer';
import Signup from './Pages/Signup';
import { BrowserRouter ,Routes ,Route} from 'react-router-dom';
import CustomerComponent from './components/customercomponents';
import AdminComponent from './components/admincomponent';
import Login from './Pages/Login';
import AddProduct from './ADMIN/addproduct';
import AddCategory from './ADMIN/category';
//import AProductList from './ADMIN/adminproductlist';
//import CProductList from './CUSTOMER/customerproductlist';
import AddsubCategory from './ADMIN/subcategory';
//import VisitorHome from './Pages/VisitorHome';
import CustomerProfile from './CUSTOMER/customerProfile';
import ViewCategory from './ADMIN/viewCategory';
import ViewSubCategory from './ADMIN/viewSubCategory';
import AdminProfile from './ADMIN/adminProfile';
import ForgotPassword from './Pages/ForgotPassword';
import OtpVerification from './Pages/OtpVerification';
import ChangePassword from './Pages/ChangePassword';
import Userchangepassword from './CUSTOMER/changepassword'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route element={<AdminComponent />}>
            <Route path="/admin/home" element={<AdminProfile/>} />
            <Route path="/admin/products" element={<h1>products</h1>}/>
            <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
            <Route path="/admin/viewcategory" element={<ViewCategory />} />
            <Route path="/admin/addsubcategory" element={<AddsubCategory />} />
            <Route path="/admin/viewsubcategory" element={<ViewSubCategory />} />
            <Route path="/admin/updateproduct" element={<h1>Update product Component</h1>} />
            <Route path="/admin/updatecategory" element={<h1>Update category Componant</h1>} />
            <Route path="/admin/updatesubcategory" element={<h1>Update Subcategory Componant</h1>} />
            <Route path="/admin/profile" element={<h1>Profile Componant</h1>} />
          </Route>
          <Route element={<CustomerComponent />}>
            <Route path="/customer/home" element={<h1>customer home</h1>} />
            <Route path="/customer/products" element={<h1>products</h1>} />
            <Route path="/customer/products/productdetails" element={<h1>Product Detail and Purchase Page</h1>} />
            <Route path="/customer/cart" element={<h1>Product cart Page</h1>} />
            <Route path='/customer/profile' element={<CustomerProfile />} />
            <Route path='/customer/changepassword' element={<Userchangepassword />} />
          </Route>
          <Route path="/" element={<h1>visitor home</h1>}/>
          <Route path="/Pages/signup" element={<Signup />} />
          <Route path="/Pages/login" element={<Login />} /> 
          <Route path="/Pages/forgotpassword" element={<ForgotPassword />} />
          <Route path="/Pages/otpverification" element={<OtpVerification />} /> 
          <Route path="/Pages/changepassword" element={<ChangePassword />} />
        </Routes>
        
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
