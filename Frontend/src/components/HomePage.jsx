import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
    return (
        <>
            <div className='flex flex-col sm:h-[450px] md:h-[550px] md:flex-row rounded-lg overflow-hidden shadow-2xl'>
                <Sidebar />
                <MessageContainer />
            </div>
        </>
    )
}

export default HomePage