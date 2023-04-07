import React from 'react'
import { Link } from 'react-router-dom'

function productDetail() { 
  return (
    <div style={{margin:"100px"}}>
        <script src="../../public/script.js"></script>
        {/* <ScriptTag isHydrating={true} type="text/javascript" 
            src="../../public/script.js" /> */}
        <div className="card-wrapper">
        <div className="card">
            {/* card left */}
            <div className="product-imgs">
            <div className="img-display">
                <div className="img-showcase">
                    <img src={require('../shoes_images/shoe_1.jpg')} alt="logo" />
                </div>
            </div>
                <div className="img-select">
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
                </div>
            </div>
            {/* card right */}
            <div className="product-content">
            <h2 className="product-title">nike shoes</h2>
            <Link to="#" className="product-link">visit nike store</Link>
            <div className="product-rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <span>4.7(21)</span>
            </div>
            <div className="product-price">
                <p className="last-price">Old Price: <span>$257.00</span></p>
                <p className="new-price">New Price: <span>$249.00 (5%)</span></p>
            </div>
            <div className="product-detail">
                <h2>about this item: </h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                <ul>
                <li><i class='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>&nbsp;&nbsp;Color: <span>Black</span></li>
                {/* <li><i class='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>Available: <span>in stock</span></li> */}
                <li><i class='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>&nbsp;&nbsp;Category: <span>Shoes</span></li>
                <li><i class='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>&nbsp;&nbsp;Shipping Area: <span>All over the India</span></li>
                <li><i class='fas fa-check-circle' style={{fontSize:"20px",color:"Green"}} aria-hidden="true"></i>&nbsp;&nbsp;Shipping Fee: <span>Free</span></li>
                <li><i class="fa fa-times-circle" style={{fontSize:"20px",color:"red"}} aria-hidden="true"></i>&nbsp;&nbsp;Available: <span>in stock</span></li>
                </ul>
            </div>
            <div className="purchase-info">
                <input type="number" min={0} defaultValue={1} />
                <button type="button" className="btn">
                Add to Cart <i className="fas fa-shopping-cart" />
                </button>
                <button type="button" className="btn">Purchase</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    
  )
}

export default productDetail