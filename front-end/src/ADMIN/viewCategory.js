import * as React from "react";
import { useEffect, useState} from "react";
import { Link} from "react-router-dom";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

  return (
    <div>
      <div className="category">
        <h1>Category</h1>
      </div>
      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{backgroundColor:"gray"}}>
              <TableRow >
                {/* <TableCell style={{ border:"1px solid",textAlign:"center"}}><h5>CategoryID</h5></TableCell> */}
                <TableCell style={{ border:"1px solid",textAlign:"center"}} align="th"><h5>Name</h5></TableCell>
                <TableCell style={{ border:"1px solid",textAlign:"center"}} align="th"><h5>Operation</h5></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((category, k) => (
                <TableRow
                  key={k}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell style={{border:"1px solid",textAlign:"center"}}component="th" scope="row">
                    {category._id}
                  </TableCell> */}
                  <TableCell style={{border:"1px solid",textAlign:"center"}}align="th">{category.name}</TableCell>
                  <TableCell style={{border:"1px solid",textAlign:"center"}}align="th">
                    <button
                      className="deletebutton"
                      onClick={() => deletecategory(category._id)}
                    >
                      DELETE
                    </button>
                    <button className="deletebutton">
                      <Link to={"/admin/updatecategory/"+category._id}>UPDATE</Link>
                      {/* <Link
                        to=""
                        state={{
                          id: (category._id)
                        }}
                      >Update</Link> */}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
