import React from 'react'
import Agent from './Agent'
import Chat from './Chat'

export default function AgentScreen(
   {chatRef, speaking, gender, language, flag}
) {

    return (
        <>
        <div className='w-3/5 flex items-center justify-center bg-gray-900 rounded-4xl'>

            <div className='min-w-150 min-h-100 flex justify-center items-center'>
                <Chat ref={chatRef}/>
            </div>

            <div className=''>
                <Agent 
                speaking={speaking}
                gender={gender}
                language={language}
                flag={flag}
                />
            </div>

        </div>
        </>
    )
}

