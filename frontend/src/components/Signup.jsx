import React, { useState } from 'react';
import { createAccount } from '../context/Authentication';
import Alert from './Alert';

export default function Signup() {
    // useStates 
    const [formData, setFormData] = useState({ username: '', password: '', name: '' });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    // functions
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (formData.username.trim() === '' || formData.password.trim() === '' || formData.name.trim() === '') {
                setAlertMsg('All fields are required!');
                setAlert('invalid');
                return;
            }
            const res = await createAccount(formData.name, formData.username, formData.password, setAlert, setAlertMsg);
        } catch (error) {
            // handle error
        } finally {
            setTimeout(() => {
                setLoading(false);
                setAlertMsg('');
                setAlert('');
            }, 100);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            <Alert status={alert} msg={alertMsg} />

            <h1 className='text-black uppercase'>Sign Up</h1>
            <form
                className='flex flex-col gap-10'
                onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        readOnly={loading}
                        className={`bg-slate-200 rounded-md px-1 h-8 outline-none ${loading && 'animate-pulse cursor-wait'}`}
                    />
                </div>
                <div className='flex justify-between'>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        readOnly={loading}
                        className={`bg-slate-200 rounded-md px-1 h-8 outline-none ${loading && 'animate-pulse cursor-wait'}`}
                    />
                </div>
                <div className='flex justify-between'>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        readOnly={loading}
                        className={`bg-slate-200 rounded-md px-1 h-8 outline-none ${loading && 'animate-pulse cursor-wait'}`}
                    />
                </div>
                <button
                    className={`outline-none  bg-blue-500 rounded-md p-2 md:hover:bg-blue-900 active:bg-blue-900 ${loading && 'animate-pulse cursor-wait'}`}
                    type="submit">Sign Up</button>
            </form>

        </>
    );
}
