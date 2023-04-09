import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('auth');
    const user= localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    const handlecart=()=>{
        navigate('/customer/cart')
    }
    
    return (
        <div>
            <div class="navbar">
                <div className="Logo"><img  className="Logo" src="https://www.pngitem.com/pimgs/m/11-110995_circle-icons-computer-my-computer-round-icon-hd.png" alt="Logo"></img></div>
                {
                  auth === "1" ?
                  <div>
                        <Link to="/customer/home">Home</Link>
                        <Link to="/customer/home">About</Link>
                        <Link to="/customer/home">Contact</Link>
                        {/* <Link to="/customer/productdetails">Product Detail and Purchase</Link> */}
                        <div class="subnav-user">
                                <button class="subnavbtn-user"><i class="fa fa-user"></i></button>
                                <div class="subnav-content-user">
                                    <Link to="/customer/profile">Profile</Link>
                                    {/* <Link to="/Pages/Settings">Settings</Link> */}
                                    <Link to="/Customer/Changepassword">ChangePassword</Link>
                                    <Link onClick={logout} to="/"><b>Logout({JSON.parse(user).name})</b></Link>
                                </div>
                        </div>
                        <div class="subnav-user">
                            <button onClick={handlecart} class="subnavbtn-user"><i  class="fa fa-shopping-cart"></i>
                           </button>
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
                                    <Link to="/admin/products">View,Update,Delete</Link>
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
                                    {/* <Link to="/Pages/Settings">Settings</Link> */}
                                    <Link to="/Pages/Changepassword">ChangePassword</Link>
                                    <Link onClick={logout} to="/"><b>Logout({JSON.parse(user).name})</b></Link>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="subnav-user"><Link to="/Pages/Login">Login</Link></div>
                            <div className="subnav-user"><Link to="/Pages/Signup">Signup</Link></div>
                        </div> 
                }
            </div>
        </div>
    )
}
export default Nav;