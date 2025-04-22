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
  const [statusOfTask, setStatusOfTask] = useState("active");
  const [discOfTask, setDiscOfTask] = useState("");
  const tasks = useSelector(data => data.tasks.tasksList);
  

  const createTask = (e) => {
    e.preventDefault();
    dispatch(setTask([...tasks, {
      id: (tasks.length > 0 ? tasks[tasks.length - 1].id : -1) + 1,
      name: nameOfTask,
      status: statusOfTask,
      disc: discOfTask
    }]))
    navigate("/")
  }
  return (
    <div className='make-task-wr'>
      <h1>Create a new task</h1>
      <form onSubmit={createTask}>
        <input type="text" placeholder='name of your task' value={nameOfTask} onChange={(e) => {setNameOfTask(e.target.value)}}/>
        <select name="status" id="status" onChange={(e) => {setStatusOfTask(e.target.value)}}>
          <option hidden>Choose status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <label>
          Discription:
          <input type="text" name='discription' onChange={(e) => setDiscOfTask(e.target.value)}/>
        </label>
        <button>Create</button>
      </form>

    </div>
  )
}
