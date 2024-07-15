import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import ModalViewEmployee from './ModalViewEmployee'

const API_BASE_URL = import.meta.env.VITE_URL_BASE

const ListEmployees = ({ employees, setEmployees }) => {
    
    const [employee, setEmployee] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const navigator = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get(`${API_BASE_URL}/api/employees`)
            .then(datos => {
                setEmployees([...employees, ...datos.data])
            })
            .catch(error => console.log(error.message))
            .finally(() => setLoading(false))
    }, [])

    const addNewEmployee = () => {
        navigator('/add-employee')
    }

    const updateEmployee = (id) => {
        navigator(`/update-employee/${id}`)
    }

    const deleteEmployee = (id) => {
        const res = confirm('Are you sure you want to delete employee: ' + id + '?')

        if (res) {
            axios.delete(`${API_BASE_URL}/api/employee/${id}`)
                .then(() => console.log('Employee deleted'))
                .catch(() => {
                    alert('Error deleting employee. Please try again.')
                })
            // window.location.reload() // esto implicaria volver a cargar todos los registros de la BD
            setEmployees(prevState => prevState.filter(item => item.id !== id))
        }
    }

    const handleModal = (item) => {
        setModalShow(true)
        setEmployee(item)
    }

    if (loading) return <BeatLoader className='text-center mt-4' color="#3d82fa" />

    return (
        <div className='container lato-regular'>
            <h2 className='text-center my-3'>List of Employees</h2>

            <button className='btn green text-white mb-2' onClick={addNewEmployee}>Add Employee</button>

            <table className='table table-striped table-bordered shadow mb-5'>
                <thead>
                    <tr>
                        <th className='dark-blue text-white'>ID</th>
                        <th className='dark-blue text-white'>First Name</th>
                        <th className='dark-blue text-white'>Last Name</th>
                        <th className='blue text-white'>Email</th>
                        <th className='blue-l text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees?.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td className='text-capitalize'>{item.firstName.toLowerCase()}</td>
                                <td className='text-capitalize'>{item.lastName.toLowerCase()}</td>
                                <td>{item.email}</td>
                                <td className='d-flex gap-3 justify-content-center'>
                                    <span onClick={() => updateEmployee(item.id)}><i className="fa-solid fa-pen-to-square cursor-pointer"></i></span>
                                    <span onClick={() => deleteEmployee(item.id)}><i className="fa-solid fa-trash text-danger cursor-pointer"></i></span>
                                    <span onClick={() => handleModal(item)}><i className="fa-solid fa-eye cursor-pointer text-blue"></i></span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <ModalViewEmployee show={modalShow} employee={employee} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default ListEmployees