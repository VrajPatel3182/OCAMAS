import React, {useEffect, useState} from "react";

const ProductCart=()=>{
    const [product, setProducts]= useState([]);

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct=async()=>{
        let result = await fetch('http://localhost:5000/viewproduct',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json(); 
        setProducts(result);
    }
    return(
        <div className="prod-list">
            <h1>Product List</h1>
            <ul>
                <li>Images</li>
                <li>Name</li>
                <li>Description</li>
                <li>Price</li>
                <li>Discount</li>
                <li>Stock</li>
                <li>Company</li>
            </ul>
            {
                product.map((item,itemselect)=>
                        <ul key={itemselect}>
                            <img className="imagebox" alt="" src={`http://localhost:5000/${item?.picture}`} />
                            <li>{item.name}</li>
                            <li>{item.description}</li>
                            <li>{item.price}</li>
                            <li>{item.discount}</li>
                            <li>{item.stock}</li>
                            <li>{item.company}</li>
                        </ul>
                ) 
            }
        </div>
    )
}

export default ProductCart;