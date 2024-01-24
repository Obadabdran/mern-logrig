import { Link,useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {Rigester} from'./index'
import { useEffect } from 'react'
const Page = () => {
  const[cookie,setCookies]=useCookies('user_token')
  const navigate=useNavigate()
  
  const handlelogout=(e)=>{
    e.preventDefault()
    setCookies('user_token','')
    window.localStorage.removeItem('UserId')
    window.location.reload(false)
      
    
  }
  
  
  return (
    <div>
   
    <button onClick={handlelogout} className='border border-solid rounded-md mt-8 bg-green-600 py-2 '>logout</button>
    
    </div>
    
    )
}

export default Page