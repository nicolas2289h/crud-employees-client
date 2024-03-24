import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom';

const ModalNotification = ({ show, setShow, modalTitle, modalInfo }) => {
    const navigator = useNavigate()

    return (
        <>
            <Modal
                size="sm"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {modalTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalInfo}</Modal.Body>
                <Modal.Footer>
                    <Button className='btn blue' onClick={() => setShow(false)}>
                        Close
                    </Button>

                    <Button className='btn green' onClick={() => navigator('/employees')}>
                        Go To List
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalNotification