import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
const MyOrders = () => {
    // const [ orders, setOrders] = useState([]);
    // useEffect(() => {
    //     getOrders();
    //   },[]);
    //   const getOrders = async () => {
    //     let result = await fetch(`http://localhost:5000/orders`);
    //     result = await result.json();
    //     console.log(result);
    //     setOrders(result);
    //   };
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const userid = JSON.parse(localStorage.getItem('userid'))
    const [username, setUser] = useState({});
    useEffect(() => {
      getOrders();
    }, []);
  
    const getOrders = async () => {
      let result = await fetch(`http://localhost:5000/orders/${user._id}`);
      result = await result.json();
      console.log(result);
      setOrders(result);
    };
    const getProduct = async () => {
        let result = await fetch("http://localhost:5000/viewproduct");
        result = await result.json();
        // console.log(result); 
        setProducts(result);
      };
    useEffect(() => {
        
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:5000/viewuser/${userid}`);
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, []);
    return(
        <div className="top-a">
            <div className="container padding-bottom-3x mb-1">
                <div className="table-responsive shopping-cart">
                    <h1>MyOrder</h1>
                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Buyer</th>
                                <th className="text-center">Date</th>
                                <th className="text-center">Payment</th>
                                <th className="text-center">Products</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center" >{index + 1}</td>
                                    <td className="text-center" >{item.status}</td>
                                    <td className="text-center">{username.name}</td>
                                    <td className="text-center" >{moment(item.createdAt).fromNow()}</td>
                                    <td className="text-center">{item.payment ? "Success" : "Failed"}</td>
                                    <td className="text-center">{item.products.length}</td>
                                </tr>
                            ))}
                        {/* <div className='container'>
                        {orders.products.map((p, i) => (
                                <tr key={i}>
                                    <td>
                                        <Link to={`/Customer/ProductDetails/${p._id}`}>
                                            {p.name}
                                        </Link>
                                    </td>

                                    <td className="text-center" >₹{p.price}</td>
                                    <td className="text-center">{p.quantity}</td>
                                    <td className="text-center">₹{p.price * p.quantity}</td>
                                </tr>
                            ))}
                        </div> */}
                        </tbody>
                    </table>
                    
                    
                </div>
            </div>
        </div>
        
        
    )
}

export default MyOrders;