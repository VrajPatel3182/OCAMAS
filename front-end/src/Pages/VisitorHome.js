import * as React from "react";
// import { experimentalStyled as styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const VisitorHome = () => {
  // const [product, setProducts] = useState([]);

  // useEffect(() => {
  //   getProduct();
  // }, []);
  // const getProduct = async () => {
  //   let result = await fetch("http://localhost:5000/viewproduct");
  //   result = await result.json();
  //   setProducts(result);
  // };
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));

  // const addproduct = async () => {
  //   const user = JSON.stringify(localStorage.getItem("user"));
  //   const userid = user._id;
  //   let result = await fetch("http://localhost:5000/addtocart", {
  //     method: "post",
  //     body: JSON.stringify({ userid }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result = await result.json();
  //   console.log(result);
  // };

  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('auth');
    if(auth==="1"){
        navigate('/customer/home')
    }else{
        if(auth==="0"){
            navigate('/admin/home')
        }
        else(
          navigate('/')
        )
    }   
  },[])
  return (
    <div>
      <h1>Visitor Home</h1>
  </div>

  );
};
export default VisitorHome;
