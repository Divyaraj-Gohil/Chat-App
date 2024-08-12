import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Signup = () => {
    const [user, setUser] = useState({
        fname: '',
        username: '',
        password: '',
        gender: ''
    })
    const navigate = useNavigate()
    const handleCheckbox = (gender) => {
        setUser({ ...user, gender: gender })
    }
    const submitHandller = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://temp-7grl.onrender.com/api/v1/user/register', user, {
                headers: {
                    'content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (res.data) {
                toast.success('User registered successfully!')
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
        setUser({
            fname: '',
            username: '',
            password: '',
            gender: ''
        })
    }
    const keypress = (event) => {
        if (event.key === 'Enter') {
            submitHandller()
        }
    }
    return (
        <div className='min-w-96 mx-auto h-[500px] md:h-auto rounded-2xl shadow-2xl bg-[#efeeee]'>
            <div className='w-full p-6'>
                <form onSubmit={submitHandller}>
                    <h1 className='text-center tracking-widest font-bold mb-4'>Create Acoount</h1>
                    <div className="divider px-3"></div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input className='w-full px-3 h-10 outline-none border border-stone-300'
                            value={user.fname}
                            onChange={(e) => setUser({ ...user, fname: e.target.value })}
                            type="text" placeholder='Name' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input className='w-full px-3 h-10 outline-none border border-stone-300'
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            type="text" placeholder='@username' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input className='w-full px-3 h-10 outline-none border border-stone-300'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            type="password" placeholder='*******' />
                    </div>
                    <div className='flex gap-5 my-4'>
                        <div className='flex gap-1'>
                            <p>Male:</p>
                            <input checked={user.gender === 'male'} onChange={() => handleCheckbox('male')} type="checkbox" className="checkbox" />
                        </div>
                        <div className='flex gap-1'>
                            <p>Female:</p>
                            <input checked={user.gender === 'female'} onChange={() => handleCheckbox('female')} type="checkbox" className="checkbox" />
                        </div>
                    </div>
                    <div className='my-4'>
                        <button onKeyUp={keypress} type='submit' className="btn shadow-md tracking-wider bg-slate-100 hover:bg-[#000000] hover:text-white w-full">SigUp</button>
                    </div>
                    <div className='flex justify-center gap-2'>
                        <p className='font-light'>Already have an Account? </p>
                        <Link to="/" className='text-blue-700'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup