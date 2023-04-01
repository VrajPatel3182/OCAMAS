import React from 'react';
import { useEffect,useState } from 'react';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material'

const sample = () => {
  const [product, setProducts]= useState([]);

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct=async()=>{
        let result = await fetch('http://localhost:5000/viewproduct');
        result = await result.json();
        setProducts(result);
    }
  const defaultMaterialTheme = createTheme()
  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
      title="Products"
      columns={[
        {title: 'Image', render: rowData=><img alt="" className='imagebox' src={`http://localhost:5000${rowData.picture}`}/>},
        {title:'Name', field:'name'},
        {title:'Description', field:'description'},
        {title:'Category', field:'category'},
        {title:'SubCategory', field:'subcategory'},
        {title:'Price', field:'price'},
        {title:'Discount', field:'discount'},
        {title:'Stock', field:'stock'},
        {title:'Company', field:'company'},
      ]}
      data={
        product
      }
      options={{
        exportButton: true
      }}
      />
</ThemeProvider>
    </div>
  );
};

export default sample;