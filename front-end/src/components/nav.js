
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
    return (
        <div className="nav">
            <div className="nav-ul">
                <img  className="Logo" src="https://www.pngitem.com/pimgs/m/11-110995_circle-icons-computer-my-computer-round-icon-hd.png" alt="Logo"></img>
                {
                auth === "1"?
                    <ul className="nav">
                        <li><Link to="/customer/home">CustomerHome</Link></li>
                        <li><Link to="/customer/products">ProductList</Link></li>
                        <li><Link to="/customer/products/productdetails">Product Detail and Purchase</Link></li>
                        {/* <li><Link to="/customer/profile">Profile</Link></li> */}
                        {/* <li><Link to="/customer/cart">CART</Link></li> */}
                        <li><Link to="/customer/changepassword">CHANGEPASSWORD</Link></li>
                        <li><Link onClick={logout} to="/Pages/login"><b>Logout({JSON.parse(user).name})</b></Link></li>
                    </ul>:
                    auth === "0"?
                    <ul className="nav-ul">
                        <li><Link to="/admin/profile">AdminProfile</Link></li>
                        <li>
                            <div class="dropdown">
                                <span>Product</span>
                                    <div class="dropdown-content">
                                        <li><Link to="/admin/addproduct">AddProducts</Link></li>
                                        <li><Link to="/admin/products">View and Delete Products</Link></li>
                                        <li><Link to="/admin/updateproduct">UpdateProducts</Link></li>
                                    </div>
                            </div>
                        </li>
                        <li>
                            <div class="dropdown">
                                <span>Category</span>
                                    <div class="dropdown-content">
                                        <li><Link to="/admin/addcategory">AddCategory</Link></li>
                                        <li><Link to="/admin/viewcategory">View and Delete Category</Link></li>
                                    </div>
                            </div>
                        </li>
                        <li>
                            <div class="dropdown">
                                <span>Sub-Category</span>
                                    <div class="dropdown-content">
                                        <li><Link to="/admin/addsubcategory">AddSubCategory</Link></li>
                                        <li><Link to="/admin/viewsubcategory">View and Delete SubCategory</Link></li>
                                    </div>
                            </div>
                        </li>
                        <li><Link onClick={logout} to="/Pages/login"><b>Logout({JSON.parse(user).name})</b></Link></li>
                    </ul>:
                    <ul className="nav-ul nav-right">
                    <li><Link to="/Pages/signup">Sign Up</Link></li>
                    <li><Link to="/Pages/login">Login</Link></li>
                </ul>
            }
            </div>
        </div>
        // <div>
        //     <a href="#" class="logo">Logo</a>
        //     <nav class="navbar">
        //         <ul>
        //             <li><a href="#">Home</a></li>
        //             <li><a href="#">About</a></li>
        //             <li><a href="#">Pages</a></li>
        //             <li><a href="#">Review</a></li>
        //             <li><a href="#">Content</a></li>
        //         </ul>
        //     </nav>
        // </div>
    )
}
export default Nav;