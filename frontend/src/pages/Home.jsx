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
                <h1 className='text-stone-400 text-center text-sm'>
                    This form is built with Express, MongoDB, and React. <a href="https://github.com/vAbdullh/Express-MongoDB-User-Authentication-System" className='font-bold underline'>more info</a>
                </h1>
            </div>

        </div>
    )
}
