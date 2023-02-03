import { useState } from "react";
import React from "react";

const AddCategory = () => {
  const [name, setCategory] = useState();

  const categorydata = async () => {
    let result = await fetch("http://localhost:5000/addcategory", {
      method: "post",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    alert(`${name} is added`);
  }
    return (
    <div className="category">
      <h1 className="heading">Add Category</h1>
      <div>
        <input
          className="inputBox"
          type="text"
          name="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="Enter Category Name"
        />
        <button onClick={categorydata} className="appButton">
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
