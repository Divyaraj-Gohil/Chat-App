import React, { useEffect } from 'react'
import axios from 'axios'
import api from '../api.js'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../store/slices/useSlice'
const getOtherUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await api.get('/user/getOtherUser')
                if (res) dispatch(setOtherUsers(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers()
    }, [])
}

export default getOtherUsers