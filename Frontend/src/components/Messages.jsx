import React, { useEffect } from 'react'
import Message from './Message'
import getmessages from '../hooks/getmessages'
import getSocketmessage from '../hooks/getSocketmessage'
import { useSelector } from 'react-redux'

function Messages() {
    getSocketmessage()
    getmessages()
    const { messages } = useSelector(state => state.message)
    if (!messages) return
    return (
        <div >
            {
                messages?.map(msg => {
                    return <Message key={msg._id} msg={msg} />
                })
            }
        </div>
    )
}

export default Messages