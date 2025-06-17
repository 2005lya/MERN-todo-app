import React, {useState} from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder = 'Enter password'}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = (password) => {
        // Basic validation: at least 8 characters, one uppercase, one lowercase, one number
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        console.log('Validating password:', password);
        return regex.test(password);
    }

    const handleChange = (e) => {
         const password = e.target.value;
         console.log('Password input changed:', password);
    const errorMessage = validatePassword(password);
    setError(errorMessage);
    onChange(e);
    }

    return (
    <div className='flex flex-col'>
      <div className='flex items-center bg-opacity-0 border-[1.5px] px-5 rounded mb-3'>
        <input
          value={value}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder || "Password"}
          className='w-full text-sm bg-opacity-0 py-3 mr-3 rounded outline-none' 
        />
        {showPassword ? (
          <FaRegEye 
            size={22}
            className="text-primary cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
}

export default PasswordInput;