import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Carousel from 'react-bootstrap/Carousel';

const CustomerHome=()=>{
  const [product, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/viewproduct");
    result = await result.json();
    console.log(result);
    setProducts(result);
  };
    return(
      <div>
            <div style={{ display: 'block', width:"100%" , padding: 30 }}>
              <Carousel>
                <Carousel.Item interval={3000}>
                  <img classname="d-block w-100" src={require("../shoes_images/slideone.jpg")} alt="" />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                  <img classname="d-block w-100" src={require("../shoes_images/slidetwo.jpg")} alt="" />
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                  <img classname="d-block w-100" src={require("../shoes_images/slidethree.jpg")} alt="" />
                </Carousel.Item>
              </Carousel>
            </div>
      <div className="row">
      {product.map((item,k)=>(
          <div className="cardp" key={k}>
          <div className="imgBox">
            <img
              src={`http://localhost:5000${item.picture}`}
              alt="mouse corsair"
              className="mouse"
            />
          </div>
          <div className="contentBox">
            <h3>{item.name}</h3>
            <h2 className="price">
              {item.price}<small></small> ₹
            </h2>
            <Link to={`/Customer/Cart/${item._id}`} className="buy">
              Add to Cart
            </Link>
            <Link to={`/Customer/ProductDetails/${item._id}`} className="buy">
              Show More
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
    )
}

export default CustomerHome;