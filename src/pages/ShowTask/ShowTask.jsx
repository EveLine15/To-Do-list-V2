import React from 'react'
import { Link } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { setTask } from '../../store/slices/tasksSlice';
import { useState, useRef, useEffect } from 'react'

import "./ShowTask.scss"

export default function ShowTask() {
  const tasks = useSelector(data => data.tasks.tasksList);
  const dispatch = useDispatch();

  const [nameChange, setNameChange] = useState(true);
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const newNameRef = useRef(null);

  const delTask = (task) => {
    const newTasks = tasks.filter(item => item.id !== task.id);
    dispatch(setTask(newTasks));
  }

  const changeStatus = (toggleId) => {
    const updatedTasks = tasks.map(t => {
      if (t.id === toggleId) {
        return { ...t, status: t.status === 'completed' ? 'active' : 'completed' };
      }
      return t;
    });
    dispatch(setTask(updatedTasks));
  }

  const changeName = (id) => {
    if (newName.trim() === "") return;
  
    const updatedTasks = tasks.map(t => {
      if (t.id === id) {
        return { ...t, name: newName };
      }
      return t;
    });
  
    dispatch(setTask(updatedTasks));
    setNameChange(true);
  }

  const handleKeyDown = (e, id) => {
    if(e.key === "Enter") changeName(id);
  }

  useEffect(() => newNameRef.current?.focus(), [nameChange])

  return (
    <div className='wr-show-task'>
      <h1>Your tasks</h1>


      <div className='function-block'>
        <div className='filters-block'>
          <input type="text" value={filterName} onChange={(e) => {setFilterName(e.target.value)}} placeholder='Name filter'/>
          <select name="status" id="status" onChange={(e) => {setFilterStatus(e.target.value)}}>
            <option hidden>Status filter</option>
            <option value="">None</option>
            <option value="active">Active</option>
            <option value="completed">Complited</option>
          </select>
        </div>
        <Link to="/make">Add new</Link>
      </div>

      <div className='tasks-holder'>
            {
              tasks
              .filter(t => {
                return filterName.length >= 3 ? t.name.toLowerCase().includes(filterName.toLowerCase()) : true;
              })
              .filter(t => {
                return filterStatus && filterStatus !== "" ? t.status === filterStatus : true;
              })
              .map((task, index) =>
                (
                  <div className='task' key={index}>
                    <div className='content'>
                      <input className='check' type="checkbox" checked={task.status === "completed"} onChange={() => changeStatus(task.id)}/>

                      <div className='taskChange-block'>
                        <h1 className={`${!nameChange}`} onDoubleClick={() => {setNameChange(false); setNewName(task.name)}}>{task.name}</h1>
                        <input ref={newNameRef} className={`taskChange ${nameChange}`} type="text" value={newName} 
                          onChange={(e) => setNewName(e.target.value)} 
                          onKeyDown={(e) => handleKeyDown(e, task.id)} 
                          onBlur={() => changeName(task.id)}/>
                      </div>

                      <p className='disc'>{task.disc}</p>
                    </div>
                    
                    <button onClick={() => delTask(task)}>Delete</button>
                  </div>
                )
              )
            }

      </div>
    </div>
  )
}
