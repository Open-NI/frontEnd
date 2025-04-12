import React from 'react'
import Agent from './Agent'
import Chat from './Chat'

export default function AgentScreen(
   {chatRef, speaking, gender, language, flag}
) {

    return (
        <>
        <div className='w-full flex items-center justify-center'>

            <div className='min-w-150 min-h-100 flex justify-center items-center'>
            <Chat ref={chatRef}/>
            </div>

            <Agent 
            speaking={speaking}
            gender={gender}
            language={language}
            flag={flag}
            />

        </div>
        </>
    )
}

