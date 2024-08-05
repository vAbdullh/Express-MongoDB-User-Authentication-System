import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
export default function Home() {
    const [formType, setFormType] = useState('login')

    const toggleForm = () => {
        setFormType((formType === 'login' ? 'signup' : 'login'));
    }

    return (
        <div className=' w-80 grid gap-5 content-center mx-auto overflow-hidden min-h-screen'>
            <div className='bg-slate-600 w-80 rounded-xl flex flex-col gap-10 justify-center items-center p-4'>

                {formType === 'login' ? <Login /> : <Signup />}
                <button
                    onClick={toggleForm}
                    className='outline-none  w-full bg-purple-500 rounded-md p-2 md:hover:bg-purple-900 active:bg-blue-900'>
                    {formType === 'login' ? 'Create a new account' : 'login'}
                </button>
            </div>

            <div className="text-stone-400">
                <h2 className='font-black'>Next Goals:</h2>
                <ul className='list-inside list-disc text-sm'>
                    <li>Implement user role management</li>
                    <li>Create pages and use JWT to show profile</li>
                    <li>Create admin page to see, delete, modify, and ban users</li>
                    <li>Add forget password process</li>
                    <li>Enhance security measures (e.g., rate limiting, account lockout)</li>
                </ul>
            </div>

        </div>
    )
}
