import { useState } from "react";
import React from "react";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [name, setCategory] = useState();

  const categorydata = async () => {
    await fetch("http://localhost:5000/addcategory", {
      method: "post",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Category Added',
      showConfirmButton: false,
      timer: 1000
    })
  }
    return (
    <div className="category">
      <h1 className="heading">Add Category</h1>
        <input className="inputBox" type="text" name="category" onChange={(e) => {setCategory(e.target.value);}}  
          placeholder="Enter Category Name"
        />
        <div onClick={categorydata} className="btn-5">
          ADD CATEGORY
        </div>
    </div>
  );
};

export default AddCategory;
