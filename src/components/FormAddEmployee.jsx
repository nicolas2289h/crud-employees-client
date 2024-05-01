import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoUserImage from '../assets/images/no-user.jpg'

import ModalNotification from './ModalNotification'

const formValues = {
  firstName: '',
  lastName: '',
  email: '',
  imagen: null
}
// https://tiresome-spade-production.up.railway.app
const API_BASE_URL = 'https://tiresome-spade-production.up.railway.app'

const FormNewEmployee = () => {
  const [formData, setFormData] = useState(formValues)
  const [error, setError] = useState()
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')

  const navigator = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trimStart() // Guarda los datos sin espacios en blanco al inicio
    })
  }

  const validateForm = () => {
    setError({})
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    }

    if (formData.imagen == null) {
      errors.imagen = 'Image is required.';
    }

    return errors;
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imagen: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setError(errors)
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('firstName', formData.firstName)
    formDataToSend.append('lastName', formData.lastName)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('imagen', formData.imagen);

    console.log(formDataToSend)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/employee`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setFormData(formValues)
      navigator('/employees ')
    } catch (error) {
      console.log(error)
      setModalTitle('There was an error')
      setModalText('Error adding employee. Please try again.')
      setShowModal(true)
    }
  }

  const handleCancel = () => {
    navigator('/employees')
  }

  return (
    <div className='container mt-3 lato-regular'>
      <div className="row">
        <div className="">
          <h2 className='text-center'>Add Employee</h2>
          <div className="d-flex justify-content-center align-items-center">
            <form className='form-control shadow info-width p-4' onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group mb-2">
                <label className='form-label fw-bold' htmlFor="firstname">First Name <span className='text-danger fw-bold'>*</span></label>
                <input onChange={handleChange} id='firstname' autoFocus type="text" placeholder='Enter First Name' name='firstName' className={`form-control ${error?.firstName && 'is-invalid'}`} value={formData.firstName} />
                {error?.firstName && <p className='alert alert-danger p-1 mt-1 text-center'>{error.firstName}</p>}
              </div>

              <div className="form-group mb-2">
                <label className='form-label fw-bold' htmlFor="lastname">Last Name <span className='text-danger fw-bold'>*</span></label>
                <input onChange={handleChange} id='lastname' type="text" placeholder='Enter Last Name' name='lastName' className={`form-control ${error?.lastName && 'is-invalid'}`} value={formData.lastName} />
                {error?.lastName && <p className='alert alert-danger p-1 mt-1 text-center'>{error.lastName}</p>}
              </div>

              <div className="form-group mb-2">
                <label className='form-label fw-bold' htmlFor="email">Email <span className='text-danger fw-bold'>*</span></label>
                <input onChange={handleChange} id='email' type="email" placeholder='Enter Email' name='email' className={`form-control ${error?.email && 'is-invalid'}`} value={formData.email} />
                {error?.email && <p className='alert alert-danger p-1 mt-1 text-center'>{error.email}</p>}
              </div>

              <div className="form-group mb-2">
                <label className='form-label fw-bold' htmlFor="imagen">Imagen de perfil:</label>
                <input type="file" name="imagen" onChange={handleFileChange} />
                {error?.imagen && <p className='alert alert-danger p-1 mt-1 text-center'>{error.imagen}</p>}
              </div>

              <div className='text-center mt-4'>
                <button type='submit' className='btn btn-width green text-white me-1'>Submit</button>
                <button type='reset' onClick={handleCancel} className='btn btn-width red text-white ms-1'>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ModalNotification show={showModal} setShow={setShowModal} modalTitle={modalTitle} modalInfo={modalText} />
    </div>
  )
}

export default FormNewEmployee
