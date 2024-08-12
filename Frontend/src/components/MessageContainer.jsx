import React, { useState } from 'react'
//import send from '../Asset/send.png'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import api from '../api'
import { setMessages } from '../store/slices/messageSlice'
import OtherUser from './User'

function MessageContainer() {
    const { selectedUser } = useSelector(state => state.user)
    const { messages } = useSelector(state => state.message)
    const dispatch = useDispatch()
    const [message, setmessage] = useState('')
    const handlesubmit = async (e) => {
        try {
            const res = await api.post(`/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    "Content-Type": 'application/json'
                },
            })
            if (res) dispatch(setMessages([...messages, res.data.newmessage]))
        } catch (error) {
            console.log(error)
        }
        setmessage('')
    }
    const keypress = (event) => {
        if (event.key === 'Enter') {
            handlesubmit()
        }
    }
    return (
        <div className=' md:min-w-[550px] md:h-full h-[500px] flex flex-col bg-white'>
            {
                selectedUser ?
                    <>
                        <OtherUser user={selectedUser} />
                        {/* <div className='flex items-center gap-5 pt-3 px-5' >
                            <div className='avatar online'>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilephoto} alt="" />
                                </div>
                            </div>
                            <div>
                                <div className='w-12 rounded-full'>
                                    <p>{selectedUser?.username}</p>
                                </div>
                            </div>
                            <div className="divider px-3"></div>
                        </div> */}
                        <div ref={scroll} className="h-full bg-chat px-4 overflow-auto">
                            <Messages />
                        </div>
                        <div className='relative'>
                            <input className='outline-none text-sm rounded-r-lg w-full bg-slate-100 px-4 py-3'
                                value={message}
                                onKeyUp={keypress}
                                onChange={(e) => setmessage(e.target.value)}
                                placeholder='Type Message...' type="text" />
                            <button onClick={handlesubmit} className='h-10 w-6  absolute inset-y-0 end-4 items-center'><img className='mix-blend-multiply' src="data:image/png;base64,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" alt="" /></button>
                        </div>
                    </> :
                    <div className='bg-chat flex flex-col gap-2 items-center justify-center h-full'>
                        <div className='font-extrabold text-[#9b9a9a] tracking-widest text-2xl'>Let's Chat</div>
                        {/* <div className='font-extrabold tracking-widest text-4xl text-zinc-800'>{authUser?.username}</div> */}
                    </div>
            }
        </div>
    )
}

export default MessageContainer