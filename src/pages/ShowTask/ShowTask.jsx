import React from 'react'
import { Link } from 'react-router'
import { useState, useRef, useEffect } from 'react'

import { useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation } from '../../Services/taskApi';

import "./ShowTask.scss"

export default function ShowTask() {
  const { data: tasks = [], isLoading } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [nameChange, setNameChange] = useState(null);
  console.log(nameChange)
  const [newName, setNewName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const newNameRef = useRef(null);

  const delTask = (id) => {
    deleteTask(id);
  }

  const changeStatus = (toggleId, currentStatus) => {
    updateTask({ id: toggleId, status: currentStatus === 'completed' ? 'active' : 'completed' });
  }

  const changeName = (Taskid) => {
    if (newName.trim() === "") return;
    updateTask({ id: Taskid, name: newName });
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
                      <label className="custom-checkbox">
                        <input 
                          type="checkbox" 
                          checked={task.status === "completed"} 
                          onChange={() => changeStatus(task.id, task.status)}/>
                        <span className="checkmark"></span>
                      </label>
                      <div className='taskChange-block'>
                        {/* true -> display: none */}
                        <h1 className={`${nameChange === task.id}`} onDoubleClick={() => {setNameChange(task.id); setNewName(task.name)}}>{task.name}</h1>
                        <input ref={newNameRef} className={`taskChange ${nameChange !== task.id}`} type="text" value={newName} 
                          onChange={(e) => setNewName(e.target.value)} 
                          onKeyDown={(e) => handleKeyDown(e, task.id)} 
                          onBlur={() => changeName(task.id)}/>
                      </div>

                      <p className='disc'>{task.disc}</p>
                    </div>
                    
                    <button onClick={() => delTask(task.id)}>Delete</button>
                  </div>
                )
              )
            }

      </div>
    </div>
  )
}
