import React, { useEffect, useRef, useState } from 'react';
// import todo_icon from '/todo_icon.png';
import Todoitems from './todoitems';
import axiosInstance from '../../utils/axiosinstance';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputError, setInputError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [description, setDescription] = useState('');
  const inputRef = useRef();

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('/tasks');
      const sortedTasks = response.data.tasks.sort(
        (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
      );
      setTodoList(sortedTasks);
      setGeneralError('');
      setSuccessMessage('');
    } catch (error) {
      setGeneralError('Error fetching tasks.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const addTask = async () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      setInputError('Task cannot be empty.');
      return;
    }

    try {
      const response = await axiosInstance.post('/add-task', {
        text: inputText,
        description: description || "",
      });
      const newTask = response.data.task;
      const updatedList = [newTask, ...todoList].sort(
        (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
      );
      setTodoList(updatedList);
      inputRef.current.value = "";
      setDescription("");
      setInputError('');
      setGeneralError('');
      showSuccessMessage('Task added successfully!');
    } catch (error) {
      setGeneralError('Error adding task.');
    }
  };

  const deleteTodo = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    if (!isConfirmed) {
      return;
    }

    try {
      await axiosInstance.delete(`/delete-task/${id}`);
      const updatedList = todoList.filter((todo) => todo._id !== id);
      setTodoList(updatedList);
      setGeneralError('');
      showSuccessMessage('Task deleted successfully!');
    } catch (error) {
      setGeneralError('Error deleting task.');
    }
  };

  const toggleTask = async (id, isComplete) => {
    // console.log("Toggling task:", id, "to", isComplete);
    try {
      const response = await axiosInstance.post(`/update-task/${id}`, { isComplete });
      console.log("Toggle Task Response:", response);
      const updatedList = todoList.map((todo) =>
        todo._id === id ? response.data.task : todo
      ).sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
      setTodoList(updatedList);
      setGeneralError('');
      showSuccessMessage(response.data.message);
    } catch (error) {
      setGeneralError('Error updating task.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl mx-auto mt-12">
      <div className="flex items-center gap-2 mb-4">
        <img className="w-8"  alt="Todo Icon" />
        <h1 className="text-3xl font-bold text-gray-800">To-Do List</h1>
      </div>

      <div className="mb-4">
        <input
          ref={inputRef}
          className="bg-gray-100 border border-gray-300 rounded-lg w-full p-2 mb-2 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add your task"
        />
        <input
          className="bg-gray-100 border border-gray-300 rounded-lg w-full p-2 mb-2 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-black rounded-lg w-full py-2 hover:bg-blue-600 transition-colors"
        >
          ADD+
        </button>
      </div>

      {inputError && <p className="text-red-500 text-sm mb-2 text-center">{inputError}</p>}
      {generalError && <p className="text-red-500 text-sm mb-2 text-center">{generalError}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-2 text-center">{successMessage}</p>}

      <div className="space-y-2">
        {todoList.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available. Add a task to get started!</p>
        ) : (
          todoList.map((item) => (
            <Todoitems
              key={item._id}
              text={item.text}
              id={item._id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={() => toggleTask(item._id, !item.isComplete)}
              createdTime={item.createdTime}
              completedTime={item.completedTime}
              description={item.description}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;