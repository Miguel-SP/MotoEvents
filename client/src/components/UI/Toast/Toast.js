import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Toast from 'react-bootstrap/Toast'



const OurToast = ({ text }) => {
    return (

        <ToastContainer position="bottom-left" autoClose={2500} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover>
            <Toast.Header> <strong className="mr-auto">MotoEvents</strong> </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
        </ToastContainer>
    )
}

export default OurToast

