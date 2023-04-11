import React,{useEffect} from "react";
import {useNavigate} from "react-router-dom";
//import validator from 'validator'
//import jwt from 'jsonwebtoken';

const Login=()=>{
    const [email,setEmail]=React.useState('');
    //const [emailerr,setEmailerror]=React.useState('');
    const [password,setPassword]=React.useState('');
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
        } 
    },[])

    //const user = jwt.decode(token)
    // const handleEmail = e =>{
    //     setEmail(e.target.value)
    //     if (validator.isEmail(email)){
    //        setEmailerror('')
    //     } else {
    //         setEmailerror('Enter valid Email!')
    //     }
    // } 


    const handleLogin= async ()=> {
        // 
        // console.warn(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:"post",
            body:JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json();
        console.warn(result);
        if(result.auth)
        {
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('userid',JSON.stringify(result.user._id));
            localStorage.setItem('auth',JSON.stringify(result.user.usertype));
            localStorage.setItem('token',JSON.stringify(result.auth));
            const usertype =  localStorage.getItem('auth');
            if(usertype==="1")
            {
                navigate('/customer/home')
            }else{
                if(usertype==="0")
                {
                    navigate('/admin/home')
                }
            }
        }
        else{
            alert("Enter Valid Username and Password")
        }

        //cosnt usertype = localStorage.getItem()

        // if(JSON.stringify(result.user.usertype)==="1")
        // {
        //      navigate("/customerHome")
        // }else{
        //     if(JSON.stringify(result.user.usertype)==="0")
        //     {
        //           navigate("/adminHome")
        //     }
        //     else{
        //         alert("INVALID USER");
        //     }
        // }   
    }
  
    const handlefp = () =>{
        navigate("/Pages/forgotpassword")
    }

    return(
        <div className="login">
            <h1 className="heading">Login</h1>
            <div>
            <input type="text" className="inputBox" placeholder="Username" 
            onChange={(e)=>setEmail(e.target.value)} value={email} required/>
            <input type="password" className="inputBox" placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)} value={password} required/>
                
                {/* <button onClick={handleLogin} className="appButton" type="submit">Login</button> */}
                <div onClick={handleLogin} className="btn-5" type="submit">
                    LOGIN
                </div>
                <div onClick={handlefp} className="btn-5" type="submit">
                    RESET PASSWORD
                </div>
                {/* <Link to="/Pages/forgotpassword">Forgot Password?</Link> */}
            </div>
        </div>
    )
}

export default Login;