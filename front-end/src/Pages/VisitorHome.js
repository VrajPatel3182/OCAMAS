import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VisitorHome = () => {
  const navigate = useNavigate();
  useEffect(()=>{

    const auth = localStorage.getItem('auth');

    if(auth==="1")
    {
         navigate("/customer/Home");
    }else{
        if(auth==="0")
        {
              navigate("/admin/Home");
        }
        else{
            navigate("/");
        }
    } 
  },[])

  return (
    <>
    <div>
      <h1>VisitorHome</h1>
    </div>
    </>
  );
};
export default VisitorHome;
