import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Todo from '../../components/todo/todo';
import axiosInstance from '../../utils/axiosinstance';

const Home = () => {
    const [userInfo, setUsersInfo] = useState({});
    const navigate = useNavigate();

    const getUserInfo = async() => {
        try{
             const response = await axiosInstance.get("/get-user");
             console.log("User Info:", response.data);
      if (response.data && response.data.user) {
        setUsersInfo(response.data.user);
      }

        }catch(error) {
          console.error("Error fetching user info:", error);
        if(error.response && error.response.status === 401) {
             localStorage.clear();
            navigate('/login');
        }   
    }
         
    } 

    useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
     <Navbar userInfo={userInfo}/>
      <Todo />
    </>
  )
}

export default Home;