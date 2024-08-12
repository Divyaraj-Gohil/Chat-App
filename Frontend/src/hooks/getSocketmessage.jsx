import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../store/slices/messageSlice"

const getSocketmessage = () => {
    const { socket } = useSelector(store => store.socket)
    const { messages } = useSelector(state => state.message)

    const dispatch = useDispatch()
    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            // console.log(newMessage)
            dispatch(setMessages([...messages, newMessage]))
        })
    }, [socket, setMessages, messages])
}

export default getSocketmessage