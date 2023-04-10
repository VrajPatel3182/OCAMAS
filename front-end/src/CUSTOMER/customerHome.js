import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import CarouselB from 'react-bootstrap/Carousel';

const CustomerHome = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/viewproduct");
    result = await result.json();
    console.log(result);
    setProducts(result);
  };
  const addToCart = (product) => {
    const item = cartItems.find((item) => item._id === product._id);
    if (item) {
      // If item is already in the cart, increase the quantity
      const updatedItems = cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      // Otherwise, add the item to the cart with quantity 1
      const newCartItem = { ...product, quantity: 1 };
      const updatedItems = [...cartItems, newCartItem];
      setCartItems(updatedItems);
    }
  };

  useEffect(() => {
    // Store cart items in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <div style={{ display: 'block', width: "100%", padding: 30 }}>
        <CarouselB>
          <CarouselB.Item interval={3000}>
            <img classname="d-block w-100" src={require("../shoes_images/fwebp.jpg")} alt="" />
          </CarouselB.Item>
          <CarouselB.Item interval={3000}>
            <img classname="d-block w-100" src={require("../shoes_images/fwebp1.jpg")} alt="" />
          </CarouselB.Item>
          <CarouselB.Item interval={3000}>
            <img classname="d-block w-100" src={require("../shoes_images/fweb2.jpg")} alt="" />
          </CarouselB.Item>
        </CarouselB>
      </div>
      <div className="cart-icon">
        <Link to="/Customer/Cart">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          <span className="cart-count">{cartItems.length}</span>
        </Link>
      </div>
      <div className="row">
        {products.map((product, index) => (
          <div className="cardp" key={index}>
            <div className="imgBox">
              <img
                src={`http://localhost:5000${product.picture}`}
                alt="shoe"
                className="shoe"
              />
            </div>
            <div className="contentBox">
              <h3>{product.name}</h3>
              <h2 className="price">
                {product.price}
                <small> ₹</small>
              </h2>
              <button className="buy" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <Link
                to={`/Customer/ProductDetails/${product._id}`}
                className="buy"
              >
                Show More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Cart */}
      {/* {cartItems.length > 0 && <Cart cartItems={cartItems} />} */}
    </div>
  );
};

export default CustomerHome;
