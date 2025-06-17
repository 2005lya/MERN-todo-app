// import {useEffect, useState} from 'react';
// import TodoItem from './TodoItem';

// const API_BASE = 'http://localhost:5000/todo';


// function App() {

//   const [items, setItems] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     GetTodos()
//   },[])

//   const handleChange = (e) => {
//     setInput(e.target.value);
//   }

//   const addItem = async() => {
//     const data = await fetch(API_BASE + '/new', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({title: input,  completed: false})
//     }).then(res => res.json())
//     console.log(data)
//     await GetTodos();
//     setInput('')
//   }

//   const GetTodos = () => {
//     fetch(API_BASE)
//       .then(res => res.json())
//       .then(data => setItems(data))
//       .catch(err => console.log(err))
//       console.log(items)  
//   }
//   return (
//     <div className="container">
//       <div className="heading">
//         <h1>TO-DO-APP</h1>
//       </div>

//       <div className="form">
//         <input type='text' value = {input} onChange = {handleChange}></input>
//         <button onClick = {() => addItem()}>
//           <span>ADD</span>
//         </button>
//       </div>

//       <div className="todolist">  
//         {
//           items.map((item) => {
//             const { _id, title, completed} = item;
//             return (
//               <TodoItem 
//                 key = {_id}
//                 id = {_id}
//                 title = {title}
//                 completed = {completed}
//                 setItems = {setItems}
//               />
//             )
//           })
//         } 
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup.jsx';

const routes = (
  <Router>
     <Routes>
     <Route path="/" exact element={<Navigate to="/login" />} />
    <Route path="/dashboard" exact element={<Home />}/>
    <Route path="/login" exact element={<Login />} />
    <Route path="/signup" exact element={<SignUp />} />
  </Routes>
  </Router>

)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
