import React from 'react'
import "./MakeTask.scss"
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setTask } from '../../store/slices/tasksSlice';
import { useSelector } from 'react-redux'
import { useState } from 'react';

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nameOfTask, setNameOfTask] = useState("");
  const [error, setError] = useState(false)
  const [statusOfTask, setStatusOfTask] = useState("active");
  const [discOfTask, setDiscOfTask] = useState("");
  const tasks = useSelector(data => data.tasks.tasksList);
  
  const createTask = (e) => {
    e.preventDefault();

    if(nameOfTask === "") {
      setError(true);
      return;
    }

    else{
      dispatch(setTask([...tasks, {
        id: (tasks.length > 0 ? tasks[tasks.length - 1].id : -1) + 1,
        name: nameOfTask,
        status: statusOfTask,
        disc: discOfTask
      }]))
      navigate("/");
    }
  }
  return (
    <div className='make-task-wr'>
      <h1>Create a new task</h1>
      <form onSubmit={createTask}>
        <div className='create-name'>
          <h2>Name of your task</h2>
          <input className={`${error ? "must-fill" : ""}`} type="text" placeholder='name of task is requied' value={nameOfTask} onChange={(e) => {setNameOfTask(e.target.value); setError(false)}}/>
        </div>

        <div className='create-comments'>
          <h2>Discription</h2>
          <textarea className='disc' type="text" name='discription' onChange={(e) => setDiscOfTask(e.target.value)}/>
        </div>        

        <div className='down-block'>
            <select name="status" id="status" onChange={(e) => {setStatusOfTask(e.target.value)}}>
              <option hidden>Choose status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            
            <button>Create</button>
        </div>
      </form>

    </div>
  )
}
