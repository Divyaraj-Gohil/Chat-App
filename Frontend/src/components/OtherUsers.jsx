import React from 'react'
import User from './User'
import getOtherUsers from '../hooks/getOtherUsers'
import { useSelector } from 'react-redux'

function OtherUsers() {
    getOtherUsers()
    const { otherUsers } = useSelector(store => store.user)
    if (!otherUsers) return
    return (
        <div className='overflow-auto shadow-lg'>
            {
                otherUsers?.otherUser?.map((user) => {
                    return (
                        <User key={user._id} user={user} />
                    )
                })
            }
        </div>
    )
}

export default OtherUsers