import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import DropIn from "braintree-web-drop-in";
const Checkout = () => {
    const userid = JSON.parse(localStorage.getItem('userid'))
    const [user, setUser] = useState({});
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem("cartItems")) || []
    );
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:5000/viewuser/${userid}`);
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        
        let total = cartItems.reduce(
            (accumulator, current) => accumulator + current.price * current.quantity,
            0
        );
        setTotalPrice(total);
    }, [cartItems]);

    // const handleCheckout = () => {
        
    //     const data = {
    //         user,
    //         cartItems,
    //         totalPrice,
    //     };
    //     fetch(`http://localhost:5000/orders`, {
    //         method: "POST",
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((response) => response.json())
            
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // };
    const handleCheckout = () => {
        const data = {
          user,
          cartItems,
          totalPrice,
        //   paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        };
        fetch(`http://localhost:5000/orders`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
            localStorage.removeItem("cartItems");
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return (
        <div className="top-a">
            <div className="container padding-bottom-3x mb-1">
                <div className="table-responsive shopping-cart">
                    <h1>Checkout</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Product</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/Customer/ProductDetails/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    </td>

                                    <td className="text-center" >₹{item.price}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-center">₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2" className="total">
                                    Total Price:
                                </td>
                                <td colSpan="2" className="total">
                                    ₹{totalPrice}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="online"
                            // checked={paymentMethod === "online"}
                            // onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Online Payment

                        </label>
                        
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                            // checked={paymentMethod === "cod"}
                            // onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Cash on Delivery
                        </label>
                    </div>
                    <h2>User Information</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.address}</p>
                    <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
