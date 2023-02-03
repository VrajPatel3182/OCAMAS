import React from "react";
import {Navigate , Outlet} from 'react-router-dom';

const AdminComponent=()=>{
    const auth = localStorage.getItem('auth');
    return auth==="0"?
        Outlet(<AdminComponent/>)
        :
        <Navigate to="/Pages/login"/>
}

export default AdminComponent;