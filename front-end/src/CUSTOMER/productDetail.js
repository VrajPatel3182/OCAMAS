import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function productDetail() { 
    const [product, setProducts] = useState("");
    console.log(product)
    const params = useParams();
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem("cartItems")) || []
    );

    const addToCart = (product) => {
        window.location.reload(false);
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

    useEffect(() => {
        getProductdetails();
      },[]);
      const getProductdetails = async () => {
        let result = await fetch(`http://localhost:5000/viewproduct/${params.id}`);
        result = await result.json();
        setProducts(result[0]);
      };
  return (
    <div>
        {/* <script src="../../public/script.js"></script> */}
        {/* <ScriptTag isHydrating={true} type="text/javascript" 
            src="../../public/script.js" /> */}
        <div className="card-wrapper">
        <div className="card">
            {/* card left */}
            <div className="product-imgs">
            <div className="img-display">
                <div className="img-showcase">
                    <img src={`http://localhost:5000${product.picture}`} alt="logo" />
                </div>
            </div>
                {/* <div className="img-select">
                    <div className="img-item">
                    <Link to data-id="1" >
                        <img src={require("../shoes_images/demoimage.jpg")} alt="shoeimage" />
                    </Link>
                    </div>
                    <div className="img-item">
                    <Link to data-id="2">
                        <img src={require('../shoes_images/demoimage.jpg')} alt="logo" />
                    </Link>
                    </div>
                    <div className="img-item">
                    <Link to='' data-id="3">
                        <img src={require("../shoes_images/demoimage.jpg")} alt="logo" />
                    </Link>
                    </div>
                    <div className="img-item">
                    <Link to='' data-id="3">
                        <img src={require("../shoes_images/demoimage.jpg")} alt="logo" />
                    </Link>
                    </div>
                </div> */}
            </div>
            {/* card right */}
            <div className="product-content">
            <h2 className="product-title">{product.name}</h2>
            {/* <Link to="#" className="product-link">visit nike store</Link> */}
            <div className="product-rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <span>4.7(21)</span>
            </div>
            <div className="product-price">
                {/* <p className="last-price">Old Price: <span>$257.00</span></p> */}
                <p className="new-price">Price: <span>{product.price} ({product.discount}%)</span></p>
            </div>
            <div className="product-detail">
                <h2>About {product.name}</h2>
                <p>{product.description}</p>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p> */}
                <ul>
                <li><i className='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>&nbsp;&nbsp;Color: <span>Black</span></li>
                {/* <li><i className='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>Available: <span>in stock</span></li> */}
                <li><i className='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>&nbsp;&nbsp;Category: <span>Electronics</span></li>
                <li><i className='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>&nbsp;&nbsp;Shipping Area: <span>All over the India</span></li>
                <li><i className='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>&nbsp;&nbsp;Shipping Fee: <span>Free</span></li>
                <li><i className="fa fa-times-circle" style={{fontSize:"20px",color:"red"}} aria-hidden="true"></i>&nbsp;&nbsp;Available: <span>in stock</span></li>
                </ul>
            </div>
            <div className="purchase-info">
                {/* <input type="number" min={0} defaultValue={1} /> */}
                <button type="button" onClick={() => addToCart(product)} className="btn">
                Add to Cart<i className="fas fa-shopping-cart" />
                </button>
                {/* <button type="button" className="btn">Purchase</button> */}
            </div>
            </div>
        </div>
        </div>
    </div>
    
  )
}

export default productDetail