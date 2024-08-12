import { Conversation } from '../models/conversation.model.js'
import { Message } from '../models/message.model.js'
import { getReceiveSocketId, io } from '../socket/socket.js'

export const sendmessage = async (req, res, next) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id
        if (!senderId || !receiverId) return next('message can not sent')
        const { message } = req.body
        if (!message) return next('message empty')

        let getconversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        if (!getconversation) {
            getconversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newmessage = await Message.create({
            senderId, receiverId, message
        })
        if (newmessage) {
            getconversation.messages.push(newmessage._id)
        }
        await getconversation.save()

        const receiverSocketId = getReceiveSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newmessage)
        }

        return res.status(201).json({ newmessage })
    } catch (error) {
        next(error)
    }
}

export const getmessage = async (req, res, next) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages")
        return res.status(200).json(conversation?.messages)
    } catch (error) {
        return next(error)
    }
}