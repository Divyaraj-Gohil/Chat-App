import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../store/slices/useSlice'
function OtherUser({ user }) {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const isonline = onlineUsers?.includes(user._id)
    const handleSelectedUser = (user) => {
        if (user._id === undefined) return
        dispatch(setSelectedUser(user))
    }
    return (
        <div>
            <div onClick={(e) => handleSelectedUser(user)} className={`${selectedUser?._id === user?._id ? 'bg-[#e1e1e1]' : ''} flex items-center shadow-md gap-5 rounded-lg p-2 `} >
                <div className={`avatar ${isonline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilephoto} alt="" />
                    </div>
                </div>
                <div className='w-28'>
                    <div className='w-full rounded-full'>
                        <p className='w-full cursor-default overflow-auto'>{user?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherUser