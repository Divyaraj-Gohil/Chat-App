import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

function Message({ msg }) {
    const scroll = useRef()
    const { authUser, selectedUser } = useSelector(store => store.user)
    useEffect(() => {
        scroll.current?.scrollIntoView({ behaviour: "smooth" })
    }, [msg])
    return (
        <div ref={scroll}
            className={`chat ${authUser && msg && authUser?.id === msg?.senderId ? 'chat-end ' : ''} chat-start`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={msg?.senderId === authUser?.id ? authUser.profilephoto : selectedUser?.profilephoto} />
                </div>
            </div>

            <div className={`chat-bubble text-black ${authUser && msg && authUser?.id === msg?.senderId ? 'bg-[#d3fae0]' : 'bg-[#ffffff]'}`}><p>{msg?.message}</p>
                <div className="chat-footer">
                    <time className="text-xs opacity-50">{moment(msg?.createdAt).format('HH:mm')}</time>
                </div>
            </div>

        </div>

    )
}

export default Message