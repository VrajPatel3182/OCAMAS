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
            <div className="navbar">
                <div className="Logo"><img  className="Logo" src="https://www.pngitem.com/pimgs/m/11-110995_circle-icons-computer-my-computer-round-icon-hd.png" alt="Logo"></img></div>
                {
                  auth === "1" ?
                  <div>
                        <Link to="/customer/home">Home</Link>
                        <Link to="/customer/aboutus">About</Link>
                        <Link to="/customer/contactus">Contact</Link>
                        {/* <Link to="/customer/productdetails">Product Detail and Purchase</Link> */}
                        <div className="subnav-user">
                                <button className="subnavbtn-user"><i className="fa fa-user"></i></button>
                                <div className="subnav-content-user">
                                    <Link to="/customer/profile">Profile</Link>
                                    {/* <Link to="/Pages/Settings">Settings</Link> */}
                                    {/* <Link to="/Customer/Changepassword">ChangePassword</Link> */}
                                    <Link onClick={logout} to="/"><b>Logout({JSON.parse(user).name})</b></Link>
                                </div>
                        </div>
                        <div className="subnav-user">
                            <button onClick={handlecart} className="subnavbtn-user"><i  className="fa fa-shopping-cart"></i>
                           </button>
                        </div>
                    </div>
                    :
                    auth === "0"?
                        <div>
                            <Link to="/admin/home">Home</Link>
                            <div className="subnav">
                                <button className="subnavbtn">Product</button>
                                <div className="subnav-content">
                                    <Link to="/admin/addproduct">AddProducts</Link>
                                    <Link to="/admin/products">View,Update,Delete</Link>
                                </div>
                            </div>
                            <div className="subnav">
                                <button className="subnavbtn">Category</button>
                                <div className="subnav-content">
                                    <Link to="/admin/addcategory">AddCategory</Link>
                                    <Link to="/admin/viewcategory">View,Update,Delete</Link>
                                </div>
                            </div>
                            <div className="subnav">
                                <button className="subnavbtn">SubCategory</button>
                                <div className="subnav-content">
                                    <Link to="/admin/addsubcategory">AddSubCategory</Link>
                                    <Link to="/admin/viewsubcategory">View,Update,Delete</Link>
                                </div>
                            </div>
                            <div className="subnav-user">
                                <button className="subnavbtn-user"><i className="fa fa-user"></i></button>
                                <div className="subnav-content-user">
                                    <Link to="/admin/profile">Profile</Link>
                                    {/* <Link to="/Pages/Settings">Settings</Link> */}
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