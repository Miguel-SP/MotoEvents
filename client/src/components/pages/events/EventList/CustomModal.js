import React from 'react'
import Modal from 'react-bootstrap/Modal'
import EventForm from './EventForm'



const CustomModal = (props) => 

        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Body>
                <EventForm {...props} />
            </Modal.Body>
        </Modal>

export default CustomModal