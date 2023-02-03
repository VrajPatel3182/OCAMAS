import  React,{useEffect, useState } from "react";


const ViewSubCategory= () => {
    const[subcategory, setSubCategoryList]= useState([]);
    useEffect(()=>{
        getcategory()
    },[])

    const getcategory = async()=>{
        let result = await fetch('http://localhost:5000/viewsubcategory')
        result =  await result.json();
        setSubCategoryList(result)
    }

    const deletecategory= async (id)=>{
        let result = await fetch(`http://localhost:5000/deletesubcategory/${id}`,{
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
        <h1 className="heading">View Sub Category</h1>
        <div>
            <div className="categorylist" >
            <ul>
                <li>ID</li>
                <li>Name</li>
                <li>Operation</li>
            </ul>
            {
                subcategory.map((subcategory,k)=>
                <ul key={k}>
                    <li>{subcategory._id}</li>
                    <li>{subcategory.name}</li>
                    <li><button onClick={()=>deletecategory(subcategory._id)}>DELETE</button></li>
                </ul>
                )
            }
            </div>
            </div>
    </div>
    )
}

export default ViewSubCategory;