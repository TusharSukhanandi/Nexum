import React from 'react'
import SearchChat from './SearchChat'
import Conversations from './Conversations'


const ConversationSideBar = () => {
  return (
  <div className='sm:w-[30%] w-full sm:h-[70dvh] h-full sm:border-r-2 sm:border-purple-500 '>
    <h1 className='text-center text-white text-3xl p-2 font-poppins'>Chats</h1>
        {/* <SearchChat/> */}
        <Conversations/>
    </div>
  )
}

export default ConversationSideBar