import React, {useEffect, useState } from "react";


const ViewCategory= () => {
    const[category, setCategoryList]= useState([]);
    useEffect(()=>{
        getcategory()
    },[])

    const getcategory = async()=>{
        let result = await fetch('http://localhost:5000/viewcategory')
        result =  await result.json();
        setCategoryList(result)
    }

    const deletecategory= async (id)=>{
        let result = await fetch(`http://localhost:5000/deletecategory/${id}`,{
            method:'DELETE'
        });
        result = await result.json();
        if(result){
            alert("category delete successfully.")
            getcategory();
        }
    }

    return (
    <div className="category">
        <h1 className="heading">View Category</h1>
        <div>
            <div className="categorylist" >
            <ul>
                <li>ID</li>
                <li>Name</li>
                <li>Operation</li>
            </ul>
            {
                category.map((category,k)=>
                <ul key={k}>
                    <li>{category._id}</li>
                    <li>{category.name}</li>
                    <li><button onClick={()=>deletecategory(category._id)}>DELETE</button></li>
                </ul>
                )
            }
            </div>
            </div>
    </div>
    )
}

export default ViewCategory;