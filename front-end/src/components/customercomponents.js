import React from "react";
import {Navigate , Outlet} from 'react-router-dom';

const CustomerComponent=()=>{
    const auth = localStorage.getItem('auth');
    return auth==="1"?
        Outlet(<CustomerComponent/>)
        :
        <Navigate to="/"/>
}

export default CustomerComponent;