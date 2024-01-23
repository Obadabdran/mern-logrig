import React, { useState } from 'react'
import Axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Mainform = (props) => {
const [username,setUsername]=useState('')
const [password,setPassword]=useState('')
const [email,setEmail]=useState('')
const[_,setCookies]=useCookies('user_token')
const navigate=useNavigate()


const handlsubmit=async(e)=>{
 e.preventDefault() 
 const response=await Axios.post('http://localhost:5000/register',{
  username,password,email
 })
 alert(response.data.message)
 
 setUsername('')
  setEmail('')
  setPassword('')
}

const handlelogin=async(e)=>{
  e.preventDefault() 
  const response=await Axios.post('http://localhost:5000/login',{username,password})
  setCookies('user_token',response.data.token)
  window.localStorage.setItem('UserId',response.data.id)
  window.location.reload
  if(response.data.status==='success'){
    if(response.data.role==='Admin'){
      navigate('/admin')
    }else{
      navigate('./page')
    }
  }
  
  
 
}



  return (
    <div className='border border-solid rounded-md w-80 md:w-96 h-96 bg-white' >
    <form onSubmit={handlsubmit} className=' flex flex-col  px-4 py-4 '>
     <label className='text-center text-2xl '>{props.title}</label>
     <label className=' '>Name:</label>
     <input type='text' placeholder='Enter Your Name' value={username} onChange={(e)=>{setUsername(e.target.value)}} className='border border-solid w-3/4' />
     {props.em
     ? (
      <>
      <label className=' '>Email:</label>
     <input type='text' placeholder='Enter Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='border border-solid w-3/4'/>
      </>
     )
    : null
    }
     <label className=' '>Password:</label>
     <input type='text' placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='border border-solid w-3/4 '/>
     {!props.em
     ? <>
        <button onClick={handlelogin} className='border border-solid rounded-md mt-16 bg-green-600 py-2 '>{props.title}</button>
        
     </>
    :null
    }
     {props.em
     ?(<>
     <button type='submit' className='border border-solid rounded-md mt-8 bg-green-600 py-2 '>{props.title}</button>
         <Link to='/login' className='border border-solid rounded-md mt-8 bg-green-600 py-2 text-center '>Login</Link>
     </>)
     : null
     }
    </form>
    
    </div>
  )
}

export default Mainform