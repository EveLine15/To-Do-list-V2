import React from 'react'
import { Link } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { setTask, toggleStatus, changeTaskName } from '../../store/slices/tasksSlice';
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

  const changeStatus = (id) => {
    dispatch(toggleStatus(id))
  }

  const changeName = (id) => {
    dispatch(changeTaskName({id: id, newName: newName}));
    setNameChange(true);
  }

  const handleKeyDown = (e, id) => {
    if(e.key === "Enter") changeName(id);
  }

  const applyNameFilter = (suitableName) => {
    dispatch(filterTasksByName(suitableName));
  }

  useEffect(() => newNameRef.current?.focus(), [nameChange])

  return (
    <div className='wr-show-task'>
      <h1>Your tasks</h1>

      <Link to="/make">Add new</Link>

      <div className='filters-block'>
        <input type="text" value={filterName} onChange={(e) => {setFilterName(e.target.value)}}/>
        <select name="status" id="status" onChange={(e) => {setFilterStatus(e.target.value)}}>
          <option value="active">Active</option>
          <option value="completed">Complited</option>
        </select>

      </div>

      <div className='tasks-holder'>
            {
              tasks
              .filter(t => {
                return filterName.length >= 3 ? t.name.toLowerCase().includes(filterName.toLowerCase()) : true;
              })
              .filter(t => {
                return filterStatus ? t.status === filterStatus : true;
              })
              .map((task, index) =>
                (
                  <div className='task' key={index}>
                    <div className='taskChange-block'>
                      <h1 className={`${!nameChange}`} onDoubleClick={() => {setNameChange(false); setNewName(task.name)}}>{task.name}</h1>
                      <input ref={newNameRef} className={`taskChange ${nameChange}`} type="text" value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                        onKeyDown={(e) => handleKeyDown(e, task.id)} 
                        onBlur={() => changeName(task.id)}/>
                    </div>

                    <input type="checkbox" checked={task.status === "completed"} onChange={() => changeStatus(task.id)}/>
                    <p className='disc'>{task.disc}</p>

                    <button onClick={() => delTask(task)}>Delete</button>
                  </div>
                )
              )
            }

      </div>
    </div>
  )
}
