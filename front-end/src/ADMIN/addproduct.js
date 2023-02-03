import  React,{useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form';

const AddProduct=()=>{

    const[name,setName]=useState();
    const[description,setDescription]=useState();
    const[price,setPrice]=useState();
    const[discount,setDiscount]=useState();
    const[company,setCompany]=useState();
    const[stock,setStock]=useState();
    const[image,setImage]=useState();
    const[categoryList, setCategory]= useState([]);
    const[subcategoryList, setSubcategory]=useState([]);
    const[category, setSelectedCategory] = useState('');
    const[subcategory, setSelectedsubCategory] = useState('');
    const[imagename, setImagename]=useState();
    const navigate = useNavigate();
    //view category;
    useEffect(()=>{
        (async()=>{
            try{
                let Category = await fetch('http://localhost:5000/viewcategory')
                Category =  await Category.json();
                setCategory(Category)
            }
            catch(e){
                console.warn("view category error", e);
            }
        })()
    },[])

    const getsubcategorybycategory = async(categoryid)=>{
        let result = await fetch(`http://localhost:5000/viewsubcategorybycategoryid/${categoryid}`,{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result.data);
        setSubcategory(result.data);
    }
    
    const handleCategorySelect = e =>{
        setSelectedCategory(e.target.value);
        getsubcategorybycategory(e.target.value);
    }

    const handleSubCategorySelect = e =>{
        setSelectedsubCategory(e.target.value);
    }

    const ProductData = async (e) => {
        console.log(name,description,price,category,subcategory,discount,stock,company,image)
        const formData = new FormData();
        formData.append('name', name)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('category',category)
        formData.append('subcategory',subcategory)
        formData.append('discount',discount)
        formData.append('stock',stock)
        formData.append('company',company)
        formData.append('image', image)

        let result = await fetch('http://localhost:5000/addproduct',{
            method:'post',
            body:formData
        })
        result = await result.json();
        console.warn(result);
        navigate("/admin/products")
    }

    function getfile(){
        document.getElementById('uploadfile').click()
    }

    const handleimage=e=>{
        setImage(e.target.files[0])
        setImagename(e.target.files[0].name)
    }
    return(
       
        <div className="Product">
            <h1 className="heading">Add Product</h1>
            <input className="inputBox" type="text" placeholder="Product Name" onChange={(e)=>setName(e.target.value)}
            />
            <textarea className="textarea" type="text" placeholder="Product Description" onChange={(e)=>setDescription(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Product Price" onChange={(e)=>setPrice(e.target.value)}
            />
            <div>
                <Form.Select className="selectitem" onChange={(e)=>{handleCategorySelect(e)}}>
                    <option>--Select Category--</option>
                    {
                        categoryList.map((category)=>(
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))    
                    }
                </Form.Select>
            </div>
            <div>
                <Form.Select className="selectitem" onChange={(e)=>{handleSubCategorySelect(e)}}>
                    <option>--Select SubCategory--</option>
                    {
                        subcategoryList.map((subcategory)=>(
                            <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                        ))    
                    }
                </Form.Select>
            </div>
            <input className="inputBox" type="text" placeholder="Product discount" onChange={(e)=>setDiscount(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Number of products" onChange={(e)=>setStock(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Product Company" onChange={(e)=>setCompany(e.target.value)}
            />
            <div className="inputbox"> 
                <input className="fileinput" type="file" id="uploadfile" onChange={handleimage}></input>
                <button onClick={getfile} className="filebutton" placeholder="Image upload">Upload Product Image</button>
                <label className="imagetext" >{imagename}</label>
            </div>
            <button onClick={ProductData} className="appButton" type="button">Add Product</button>
        </div> 
    )
}

export default AddProduct;