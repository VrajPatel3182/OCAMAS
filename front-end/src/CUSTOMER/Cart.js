import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
// import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem("cartItems")) || []
    );
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
       
        // Calculate the total price of all cart items
        let total = cartItems.reduce(
            (accumulator, current) => accumulator + current.price * current.quantity,
            0
        );
        setTotalPrice(total);
    }, [cartItems]);

    const removeFromCart = (item) => {
        window.location.reload(false);
        const updatedItems = cartItems.filter((i) => i._id !== item._id);
        setCartItems(updatedItems);
    };

    const updateQuantity = (item, quantity) => {
        
        const updatedItems = cartItems.map((i) =>
            i._id === item._id ? { ...i, quantity } : i
        );
        setCartItems(updatedItems);
    };

    useEffect(() => {
        // Store cart items in localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="top-a">
            {cartItems.length > 0 ? (
                <div className="container padding-bottom-3x mb-1">
                    <div className="table-responsive shopping-cart">
                        <h1>Your Cart</h1>
                        {/* <div className="cart-icon">
                            <Link to="/Customer/Cart">
                                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                                <span className="cart-count">{cartItems.length}</span>
                            </Link>
                        </div> */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-center">Image</th>
                                    <th className="text-center">Product</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Total</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center">
                                            <img src={`http://localhost:5000${item.picture}`} alt="product" style={{ width: "100px" }} />
                                        </td>
                                        <td>
                                            <Link className="text-center" to={`/Customer/ProductDetails/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </td>

                                        <td className="text-center" >₹{item.price}</td>
                                        <td className="text-center">
                                            <input
                                                style={{textAlign:"center"}}
                                                className="count-input"
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQuantity(item, parseInt(e.target.value))
                                                }
                                            />
                                        </td>
                                        <td className="text-center">₹{item.price * item.quantity}</td>
                                        <td className="text-center">
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="12" style={{textAlign:"end"}}>
                                        Total Price: ₹{totalPrice}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="gap-3 d-md-flex justify-content-md-end text-center">
                            <Link to="/Customer/Checkout" className="btn btn-primary btn-lg">
                                Checkout
                            </Link>
                        </div>
                        
                    </div>

                </div>
            ) : (
                <div>
                    <h1>Your Cart is Empty</h1>
                    <Link to="/customer/home" className="btn btn-primary btn-lg">Continue Shopping</Link>
                </div>
            )}

        </div>
    );
};

export default Cart;