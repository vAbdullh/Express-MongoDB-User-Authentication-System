import React, { useState } from 'react';
import { login } from '../context/Authentication'
import Alert from './Alert';

export default function File() {
    // useStates 
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const [alertmMsg, setaAlertMsg] = useState('')

    // functions
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (formData.username.trim() === '' || formData.password.trim() === '') {
                setaAlertMsg('username and password cant be empty!')
                setAlert('invalid')

                return
            }
            const res = await login(formData.username, formData.password, setAlert, setaAlertMsg)
        } catch (error) {

        } finally {
            setTimeout(() => {
                setLoading(false);
                setaAlertMsg('')
                setAlert('')
            }, 10);
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            <Alert status={alert} msg={alertmMsg} />
            <h1 className='text-black uppercase'>Login</h1>
            <form
                className='flex flex-col gap-10'
                onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <label>username:</label>
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
                    type="submit"
                    disabled={loading}
                    className={`outline-none  bg-blue-500 rounded-md p-2 md:hover:bg-blue-900 active:bg-blue-900 ${loading && 'animate-pulse cursor-wait active:bg-blue-500'}`}>Login</button>
            </form>
        </>
    )
}
