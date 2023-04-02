import * as React from 'react';
import {useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ViewSubCategoryList() {
    const[subcategory, setSubCategoryList]= useState([]);
    useEffect(()=>{
        getsubcategory()
    },[])

    const getsubcategory = async()=>{
        let result = await fetch('http://localhost:5000/viewsubcategory')
        result =  await result.json();
        setSubCategoryList(result)
    }

    const deletecategory= async (id)=>{
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
                fetch(`http://localhost:5000/deletesubcategory/${id}`,{
                    method:'DELETE'
                });
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            getsubcategory();
          });
    }
  return (
    <div >
      <div className="category">
        <h1>SubCategory</h1>
      </div>
      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>SubCategoryID</b></TableCell>
                <TableCell align="th"><b>Subcategory</b></TableCell>
                <TableCell align="th"><b>Category</b></TableCell>
                <TableCell align="th"><b>Operation</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategory.map((subcategory, k) => (
                <TableRow
                  key={k}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {subcategory._id}
                  </TableCell>
                  <TableCell align="th">{subcategory.name}</TableCell>
                  <TableCell align="th">{subcategory.category.name}</TableCell>
                  <TableCell align="th">
                    <button
                      className="deletebutton"
                      onClick={() => deletecategory(subcategory._id)}
                    >
                      DELETE
                    </button>
                      <Link  to={"/admin/updatesubcategory/"+subcategory._id}><button className='deletebutton'>UPDATE</button></Link>
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