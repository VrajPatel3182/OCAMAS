import * as React from "react";
import { useEffect, useState} from "react";
import { Link} from "react-router-dom";
import Swal from "sweetalert2";
import { ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

export default function Categoryist() {

  //const navigate = useNavigate();
  
  const [category, setCategoryList] = useState([]);
  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let result = await fetch("http://localhost:5000/viewcategory");
    result = await result.json();
    setCategoryList(result);
  };

  // const handleUpdate = (id) =>{
    
  //   //  navigate({pathname:"/admin/updatecategory/",search:createSearchParams({id:category._id}).toString()});
  //   // navigate("/admin/updatecategory", {
  //   //   state: {
  //   //     id: category._id
  //   //   }
  //   // });
  // }

  const deletecategory = async (id) => {
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
        fetch(`http://localhost:5000/deletecategory/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getcategory();
      }
    });
  };
  const defaultMaterialTheme = createTheme();
  return (
    <div>
      <div className="category" style={{textAlign:"center"}}>
        <h1>Category List</h1>  
      </div>
      <div style={{width:"800px",marginInline:"auto"}}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title="Category"
          columns={[
            { title: "Name", field: "name" },
            {
              title:"Edit",
              //cellStyle:{textAlign:"center"},
              render: rowData =><Link to={`/admin/updatecategory/${rowData._id}`}><i className="fa fa-edit" /></Link>,sorting:false
            },
            {
              title:"Delete",
              //cellStyle:{textAlign:"center",width:"10px"},
              render: rowData => <Link onClick={()=>deletecategory(rowData._id)} to><i className="fa fa-trash" /></Link>,sorting:false
            }
          ]}
          data={category}
          options={{
            exportButton: true,
            headerStyle:{
              backgroundColor:"lightgray"
            }
          }}
        />
      </ThemeProvider>
    </div>
    </div>
  );
}
