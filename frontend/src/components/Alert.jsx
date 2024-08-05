import React from 'react';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Alert({ status, msg }) {
    const toastId = React.useRef(null);
    const styles = {
        position: 'top-center',
        theme: 'colored',
        transition: Zoom,
        pauseOnFocusLoss: false
    }
    const notify = () => {
        if (status === 'success') {
            toast.success(msg || 'Logged in successfully!', styles);
        } else if (status === 'invalid') {
            toast.error(msg || 'Invalid username or password. Please check and try again.', styles);
        } else if (status === 'error') {
            toast.warn('Server error, try again later!', styles);
        }
    };

    React.useEffect(() => {
        if (status) {
            notify();
        }
    }, [status]);   

    return (
        <div className='absolute'>
            <ToastContainer />
        </div>
    );
}
