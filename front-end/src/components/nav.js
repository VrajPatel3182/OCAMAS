import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('auth');
    const user= localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/Pages/login')
    }
    const handlecart=()=>{
        navigate('/Customer/Cart')
    }

    return (
        // <div className="nav">
        //     <div className="nav-ul">
        //         <img  className="Logo" src="https://www.pngitem.com/pimgs/m/11-110995_circle-icons-computer-my-computer-round-icon-hd.png" alt="Logo"></img>
        //         {
        //         auth === "1"?
        //             <ul className="nav">
        //                 <li><Link to="/customer/home">CustomerHome</Link></li>
        //                 <li><Link to="/customer/products">ProductList</Link></li>
        //                 <li><Link to="/customer/products/productdetails">Product Detail and Purchase</Link></li>
        //                 {/* <li><Link to="/customer/profile">Profile</Link></li> */}
        //                 {/* <li><Link to="/customer/cart">CART</Link></li> */}
        //                 <li><Link to="/customer/changepassword">CHANGEPASSWORD</Link></li>
        //                 <li><Link onClick={logout} to="/Pages/login"><b>Logout({JSON.parse(user).name})</b></Link></li>
        //             </ul>:
        //             auth === "0"?
        //             <ul className="nav-ul">
        //                 <li><Link to="/admin/profile">AdminProfile</Link></li>
        //                 <li>
        //                     <div class="dropdown">
        //                         <span>Product</span>
        //                             <div class="dropdown-content">
        //                                 <li><Link to="/admin/addproduct">AddProducts</Link></li>
        //                                 <li><Link to="/admin/products">View and Delete Products</Link></li>
        //                                 <li><Link to="/admin/updateproduct">UpdateProducts</Link></li>
        //                             </div>
        //                     </div>
        //                 </li>
        //                 <li>
        //                     <div class="dropdown">
        //                         <span>Category</span>
        //                             <div class="dropdown-content">
        //                                 <li><Link to="/admin/addcategory">AddCategory</Link></li>
        //                                 <li><Link to="/admin/viewcategory">View and Delete Category</Link></li>
        //                             </div>
        //                     </div>
        //                 </li>
        //                 <li>
        //                     <div class="dropdown">
        //                         <span>Sub-Category</span>
        //                             <div class="dropdown-content">
        //                                 <li><Link to="/admin/addsubcategory">AddSubCategory</Link></li>
        //                                 <li><Link to="/admin/viewsubcategory">View and Delete SubCategory</Link></li>
        //                             </div>
        //                     </div>
        //                 </li>
        //                 <li><Link onClick={logout} to="/Pages/login"><b>Logout({JSON.parse(user).name})</b></Link></li>
        //             </ul>:
        //             <ul className="nav-ul nav-right">
        //             <li><Link to="/Pages/signup">Sign Up</Link></li>
        //             <li><Link to="/Pages/login">Login</Link></li>
        //         </ul>
        //     }
        //     </div>
        // </div>

        <div>
            <div class="navbar">
                <div className="Logo"><img  className="Logo" src="https://www.pngitem.com/pimgs/m/11-110995_circle-icons-computer-my-computer-round-icon-hd.png" alt="Logo"></img></div>
                {
                  auth === "1" ?
                  <div>
                          
                        {/* <Link to="/customer/profile">Profile</Link>*/}
                        {/* <Link to="/customer/cart">CART</Link>*/}
                        <Link to="/customer/home">CustomerHome</Link>
                        <Link to="/customer/products">ProductList</Link>
                        <Link to="/customer/products/productdetails">Product Detail and Purchase</Link>
                        <div class="subnav-user">
                                <button class="subnavbtn-user"><i class="fa fa-user"></i></button>
                                <div class="subnav-content-user">
                                    <Link to="/admin/profile">Profile</Link>
                                    <Link to="/Pages/Settings">Settings</Link>
                                    <Link to="/Pages/Changepassword">ChangePassword</Link>
                                    <Link onClick={logout} to="/Pages/login"><b>Logout({JSON.parse(user).name})</b></Link>
                                </div>
                        </div>
                        <div class="subnav-user">
                            <button onClick={handlecart} class="subnavbtn-user"><i  class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    :
                    auth === "0"?
                        <div>
                            <Link to="/admin/home">Home</Link>
                            <div class="subnav">
                                <button class="subnavbtn">Product</button>
                                <div class="subnav-content">
                                    <Link to="/admin/addproduct">AddProducts</Link>
                                    <Link to="/admin/products">View and Delete Products</Link>
                                    <Link to="/admin/updateproduct">UpdateProducts</Link>
                                </div>
                            </div>
                            <div class="subnav">
                                <button class="subnavbtn">Category</button>
                                <div class="subnav-content">
                                    <Link to="/admin/addcategory">AddCategory</Link>
                                    <Link to="/admin/viewcategory">View,Update,Delete</Link>
                                </div>
                            </div>
                            <div class="subnav">
                                <button class="subnavbtn">SubCategory</button>
                                <div class="subnav-content">
                                    <Link to="/admin/addsubcategory">AddSubCategory</Link>
                                    <Link to="/admin/viewsubcategory">View,Update,Delete</Link>
                                </div>
                            </div>
                            <div class="subnav-user">
                                <button class="subnavbtn-user"><i class="fa fa-user"></i></button>
                                <div class="subnav-content-user">
                                    <Link to="/admin/profile">Profile</Link>
                                    <Link to="/Pages/Settings">Settings</Link>
                                    <Link to="/Pages/Changepassword">ChangePassword</Link>
                                    <Link onClick={logout} to="/Pages/login"><b>Logout({JSON.parse(user).name})</b></Link>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="subnav-user"><Link to="/Pages/Login">Login</Link></div>
                            <div className="subnav-user"><Link to="/Pages/Signup">Signup</Link></div>
                        </div>
                }
                {/* <div class="subnav">
                        <button class="subnavbtn">Partners <i class="fa fa-caret-down"></i></button>
                        <div class="subnav-content">
                            <a href="#link1">Link 1</a>
                            <a href="#link2">Link 2</a>
                            <a href="#link3">Link 3</a>
                            <a href="#link4">Link 4</a>
                        </div>
                    </div> */}
                
            </div>
        </div>
    )
}
export default Nav;