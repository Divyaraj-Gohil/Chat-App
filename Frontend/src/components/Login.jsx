import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../store/slices/useSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandller = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://temp-7grl.onrender.com/api/v1/user/login', user, {
                headers: {
                    "Content-Type": 'application/json'
                },
            })
            if (res.data) {
                //console.log(res.data)
                dispatch(setAuthUser(res.data))
                localStorage.setItem('authUser', JSON.stringify(res.data))
                toast.success('Login successfully!')
                navigate('/chat')
            }
        } catch (error) {
            console.log(error)
        }
        setUser({
            username: '',
            password: ''
        })
    }
    const keypress = (event) => {
        if (event.key === 'Enter') {
            submitHandller()
        }
    }
    return (
        <div className='min-w-96 h-[400px] md:h-auto rounded-2xl shadow-2xl mx-auto bg-[#efeeee]'>
            <div className='w-full p-6'>
                <form onSubmit={submitHandller}>
                    <h1 className='text-center tracking-widest font-bold mb-4'>Login</h1>
                    <div className="divider px-3"></div>
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
                    <div className='mb-4 mt-7'>
                        <button onKeyUp={keypress} type='submit' className="btn shadow-md tracking-wider bg-slate-100 hover:bg-[#000000] hover:text-white w-full">Sig-In</button>
                    </div>
                    <div className='flex justify-center gap-2'>
                        <p className='font-light'>Don't have an Account? </p>
                        <Link to="/signup" className='text-blue-700'>Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login