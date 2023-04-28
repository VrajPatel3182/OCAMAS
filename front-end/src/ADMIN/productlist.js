import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import Swal from "sweetalert2";

const productlist = () => {
  const [product, setProducts] = useState([]);
  // const [category, setCategoryList] = useState([]);

  useEffect(() => {
    getProduct();
    // getcategory();
  },[]);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/viewproduct");
    result = await result.json();
    // console.log(result)
    setProducts(result);
  };
  // const getcategory = async () => {
  //   let result = await fetch("http://localhost:5000/viewcategory");
  //   result = await result.json();
  //   setCategoryList(result);
  // };
  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        fetch(`http://localhost:5000/deleteproduct/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your Product has been deleted.", "success");
      }
      getProduct();
    });
  };
  
  const defaultMaterialTheme = createTheme();
  return (
    <div style={{display:"flexbox",marginBottom:"30px"}}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title="Products"
          columns={[
            {
              title: "Image",
              render: (rowData) => (
                <img
                  alt=""
                  className="imagebox"
                  src={`http://localhost:5000${rowData.picture}`}
                />
              ),
              sorting: false
            },
            { title: "Name", field: "name" },
            { title: "Description", field: "description",sorting: false },
            { title: "Category", field: "category.name"},
            { title: "SubCategory", field: "subcategory.name" },
            { title: "Price", field: "price" },
            { title: "Discount", field: "discount"},
            { title: "Stock", field: "stock" },
            { title: "Company", field: "company" },
            {
              title:"Edit",
              // cellStyle:{textAlign:"center"},
              render: rowData =><Link to={`/admin/updateproduct/${rowData._id}`}><i className="fa fa-edit" /></Link>
            },
            {
              title:"Delete",
              // cellStyle:{textAlign:"center",width:"10px"},
              render: rowData => <Link onClick={()=>handledelete(rowData._id)} to><i className="fa fa-trash" /></Link>
            }
          ]}
          data={product}
          options={{
            exportButton: true,
            headerStyle:{
              backgroundColor:"lightgray"
            }
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default productlist;
