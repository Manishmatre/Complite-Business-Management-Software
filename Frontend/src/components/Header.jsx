import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from "../assets/logo.png"
import Profile from "../assets/profile.jpeg"
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className='w-screen bg-gray-900 px-5 fixed top-0 left-0 h-20 flex justify-between items-center z-10'>
       <div className="logo">
         <Link to="/admin-dashboard">
           <h1 className='text-white text-3xl font-bold'><AutoGraphIcon /> StaffEasy</h1>
         </Link>
       </div>
       <div className="flex items-center space-x-4">
         <div className="text-white">
           <span className="font-semibold">Welcome, </span>
           <span>{user?.fullName || 'User'}</span>
         </div>
         <div className="profile w-10 h-10 rounded-full overflow-hidden">
           <img src={Profile} alt="Profile" className='w-full h-full object-cover'/>
         </div>
         <button 
           onClick={logout}
           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold"
         >
           Logout
         </button>
       </div>
    </div>
  )
}

export default Header