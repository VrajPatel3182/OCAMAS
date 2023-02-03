import React,{useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';

const AddsubCategory= () => {
    const[categorylist, setCategorylist]= useState([]);
    //const[subcategorylist, setSubCategoryList]= useState([]);
    const[name, setSubCategory]=useState();
    const[category, setselectedCategory]=useState();

    useEffect(()=>{
        (async()=>{
            try{
                let Category = await fetch('http://localhost:5000/viewcategory')
                Category =  await Category.json();
                setCategorylist(Category)
            }
            catch(e){
                console.warn("view category error", e);
            }
        })()
    },[])

    const subcategorydata = async (e)=>{
        console.log(name,category)
        let result = await fetch('http://localhost:5000/addsubcategory',{
            method: 'post',
            body: JSON.stringify({ name,category }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        alert(`${name} is added successfully.`)
    
    }

    const handleCategorySelect = (e) =>{
        setselectedCategory(e.target.value);
    }
 

    return (
    <div className="Product">
        <h1 className="heading">Add Sub-Category</h1>
            <input className="inputBox" type="text" onChange={e => {setSubCategory(e.target.value)}} placeholder="Enter SubCategory Name" />
            <div>
                <Form.Select className="selectitem" onChange={(e)=>{handleCategorySelect(e)}}>
                    <option>Select Category</option>
                    {
                        categorylist.map((category)=>(
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))    
                    }
                </Form.Select>
            </div>
            <button onClick={subcategorydata} className="appButton" type="submit">Add Category</button>
        
    </div>
    )
}

export default AddsubCategory;