import React, { useState } from 'react'
import search from '../Asset/search.png'
import OtherUsers from './OtherUsers'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setOnlineUsers, setSelectedUser } from '../store/slices/useSlice'
import OtherUser from './User'

function Sidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const {onlineUsers} = useSelector(store=>store.user)
    const { authUser } = useSelector(store => store.user)
    const { otherUsers } = useSelector(state => state.user)
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const handlelogout = async () => {
        try {
            const res = await axios.get('https://temp-7grl.onrender.com/api/v1/user/logout', {
                headers: {
                    'content-Type': 'application/json',
                },
            })
            if (res) {
                dispatch(setSelectedUser(null))
                dispatch(setAuthUser(null))
                // dispatch(setOnlineUsers())
                localStorage.removeItem('authUser')
                toast.info('Logged out...')
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const filterUsers = (query) => {
        const searchTerm = searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive search

        return otherUsers?.otherUser?.filter(user => {
            const { username } = user; // Assuming these properties for matching
            return (
                username.toLowerCase().includes(searchTerm)
            );
        });
    }

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredUsers = filterUsers(query);
        setSuggestions(filteredUsers);
    };
    const suggestUser = (username) => {
        const isuser = otherUsers?.otherUser?.find((user) => user.username.includes(username))
        dispatch(setSelectedUser(isuser))
        setSearchQuery('')
        setSuggestions('')
    }

    return (
        <div className='border-r md:w-auto w-screen  md:h-full h-[260px] bg-white border-stone-300 mp-4 flex flex-col'>
            <form className='flex items-center justify-center md:justify-normal relative'>
                <input className='input input-bordered mt-3 rounded-lg'
                    onChange={handleInputChange}
                    value={searchQuery}
                    placeholder='search...' type="text" />
                <button disabled className='hidden md:block md:h-15 md:w-10 md:absolute md:inset-y-0 md:end-0 md:items-center'><img src="data:image/png;base64,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" alt="" /></button>
            </form>
            {suggestions !== '' &&
                <ul className='my-1 px-5 rounded-md bg-slate-200 cursor-pointer w-full h-36 md:h-16 overflow-auto'>
                    {suggestions.map(user => (
                        <li onClick={() => suggestUser(user.username)} key={user.id}>{user.username}</li>
                    ))}
                </ul>
            }
            {/* <div className="divider px-3"></div> */}
            <div className='h-full mt-2 overflow-auto'>
                <OtherUsers />
                {/* <OtherUsers />
                <OtherUsers />
                <OtherUsers /> */}
            </div>
            <div className='mt-4 flex justify-between'>
                <div className={`flex items-center shadow-md gap-5 rounded-lg p-2 `} >
                    <div className={`avatar online`}>
                        <div className='w-12 rounded-full'>
                            <img src={authUser?.profilephoto} alt="" />
                        </div>
                    </div>
                    <div className='w-28'>
                        <div className='w-full rounded-full'>
                            <p className='w-full cursor-default overflow-auto'>{authUser?.username}</p>
                        </div>
                    </div>
                </div>
                <button onClick={handlelogout} className="btn btn-active mt-4 bg-black hover:text-black hover:bg-white  text-white">Logout</button>
            </div>
        </div>
    )
}

export default Sidebar