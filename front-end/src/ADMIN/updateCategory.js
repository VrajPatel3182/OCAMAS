import React, { useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const updateCategory = () => {

  const[name, setCategory]=useState('');
  const params = useParams();

  //const navigate = useNavigate();
  // const location = useLocation();
  // console.log('location', location.state.id)

  useEffect(()=>{
    getCategoryname();
  },[])

  const getCategoryname = async() =>{
    let result = await fetch(`http://localhost:5000/viewcategory/${params.id}`);
    result =await result.json()
    setCategory(result[0].name)
    //console.log(result[0].name)
  }

  const handleUpdate = async(e) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Upadate it!",
    }).then((result) => {
      if (result.isConfirmed) {
      fetch(`http://localhost:5000/updatecategory/${params.id}`,{
      method:'PUT',
      body:JSON.stringify({name}),
      headers:{
        'Content-Type':"application/json"
      }
      })
        Swal.fire("Update!", "Your file has been updated.", "success");
      }
    });
  };

  return (
    <div className="category">
      <h1 className="heading">Category Update</h1>
          <input className="inputBox" onChange={(e)=>setCategory(e.target.value)} value={name} required/>
        <div onClick={handleUpdate} className='btn-5' type='submit'>UPDATE</div>
    </div>
  )
}

export default updateCategory;