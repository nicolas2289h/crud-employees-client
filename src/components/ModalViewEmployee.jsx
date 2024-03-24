import React from 'react'
import Modal from 'react-bootstrap/Modal'

const ModalViewEmployee = (props) => {

    const convertToLowerCase = (text) => {
        return text && text.toLowerCase()
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Employee Nº {props.employee.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='text-start text-capitalize'><span className='fw-bold'>First Name:</span> {convertToLowerCase(props.employee.firstName)}</p>
                <p className='text-start text-capitalize'><span className='fw-bold'>Last Name:</span> {convertToLowerCase(props.employee.lastName)}</p>
                <p className='text-start'><span className='fw-bold'>Email:</span> {props.employee.email}</p>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

export default ModalViewEmployee