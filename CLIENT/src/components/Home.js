import React, { useEffect, useState,  } from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if(!token){
      navigate("/");
    }
    findUser();
  },[token,navigate]);

  const findUser = async () => {
  try {
    const response = await axios.get("https://memo-i7q4.onrender.com

/users", {
      headers: {
        Authorization: `${token}`, 
      },
    });
    setUsers(response.data);
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};

  const handleDelete = async (id)=>{
    // await axios.delete(`http://localhost:8081/user/${id}`);
    await axios.delete(`https://memo-i7q4.onrender.com

/user/${id}`,{
      headers: {
        Authorization: `${token}`, 
      },
    });
    findUser();
  }
  return (
    <>
    <Navbar />
    <div className='table-data mx-5'>
      <table className="table table-striped mt-5 border">
        <thead>
          <tr className='text-center border'>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">email</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          users.map((user,index) =>{
            return(
              <tr className='text-center border'  key={index}>
            <th scope="row">{index+1}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <Link to={`/view/${user._id}`} className='btn btn-warning text-light mx-2 '>view</Link>
              <Link to={`/edit/${user._id}`} className='btn btn-warning text-light mx-2 '>edit</Link>
              <button onClick={()=>handleDelete(user._id)} className='btn btn-warning text-light mx-2'>delete</button>
            </td>
          </tr>
            )
          })
        }
          
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Home;