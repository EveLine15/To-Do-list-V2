import { Route, Routes } from 'react-router'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './App.scss'

import MakeTask from "../pages/MakeTask/MakeTask"
import ShowTask from "../pages/ShowTask/ShowTask"

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/")
  }, []);
  return (
    <>
      <div className='container'>
        <Routes>
          <Route path="/make" element={<MakeTask />} />
          <Route path="/" element={<ShowTask />} />
        </Routes>
      </div>
    </>
  )
}

