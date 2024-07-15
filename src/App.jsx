import './App.css'
import ListEmployees from './components/ListEmployees'
import Header from './components/Header'
import FormNewEmployee from './components/FormAddEmployee'
import { Routes, Route } from 'react-router-dom'
import FormUpdateEmployee from './components/FormUpdateEmployee'
import { useState } from 'react'

const preListEmployees = [
  { id: 1, firstName: 'Nicolas', lastName: 'Huanca', email: 'nicolas@gmail.com' },
  { id: 2, firstName: 'Laura', lastName: 'Molina', email: 'lauramol99@gmail.com' },
  { id: 3, firstName: 'Francisco', lastName: 'Romero', email: 'fran23@gmail.com' },
  { id: 4, firstName: 'Natalia', lastName: 'Gonzalez', email: 'ngonz@gmail.com' },
]


function App() {
  const [employees, setEmployees] = useState(preListEmployees)

  return (
    <div className=''>
      <Header setEmployees={setEmployees} />
      <Routes>
        <Route path='/' element={<ListEmployees employees={employees} setEmployees={setEmployees} />}></Route>
        <Route path='/employees' element={<ListEmployees employees={employees} setEmployees={setEmployees} />}></Route>
        <Route path='/add-employee' element={<FormNewEmployee />}></Route>
        <Route path='/update-employee/:id' element={<FormUpdateEmployee />}></Route>
        <Route path='*' element={<h1 className='text-center mt-5'>404 Not Found</h1>}></Route>
      </Routes>

      {/* <Footer /> */}
    </div>
  )
}

export default App
