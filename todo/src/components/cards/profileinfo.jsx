import React from 'react';
import { getInitials } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';


const ProfileInfo = ({ userInfo }) => {
    const navigate = useNavigate();
    const onLogout = () => {
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed) {
           return;
        }
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className='flex items-center gap-3'>
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-primary">
        {getInitials(userInfo?.fullName)} 
      </div>

      <div>
        <p className='text-sm font-medium'>{userInfo?.fullName}</p>
        <button className='text-sm text-blue-700 underline' onClick={ onLogout }>
          Logout
        </button>
      </div>
    </div>
    )
}

export default ProfileInfo;
