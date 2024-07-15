import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_URL_BASE

const Header = ({ setEmployees }) => {
    const [name, setName] = useState('')

    const handleChange = (e) => {
        const value = e.target.value.trimStart()
        setName(value)

        if (value.trim() === '') {
            axios.get(`${API_BASE_URL}/api/employees`)
                .then(response => {
                    setEmployees(response.data)
                })
                .catch(() => console.log("No results for this search."))
        } else {
            axios.get(`${API_BASE_URL}/api/employees/${value}`)
                .then(response => {
                    setEmployees(response.data)
                })
                .catch(() => console.log("No results for this search."))
        }
    }

    return (
        <>
            <nav className="navbar navbar-dark blue">
                <div className="container-fluid">
                    <Link to='/employees' className='navbar-brand'>Employee Management</Link>
                    <div className="d-flex" role="search">
                        <input onChange={handleChange} value={name} className="form-control me-2" type="search" placeholder="Search by First Name" aria-label="Search" />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
