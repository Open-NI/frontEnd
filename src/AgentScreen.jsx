import React from 'react'
import Agent from './Agent'
import Chat from './Chat'

export default function AgentScreen(
   {chatRef, speaking, gender, language, flag}
) {

    return (
        <>
        <div className='w-4/5 flex items-center justify-center bg-[#1a1a1a] rounded-4xl p-10 gap-10'>

            <div className='max-w-150 min-h-170 flex justify-center items-center shadow-[12px_12px_20px_rgba(0,0,0,0.4)]'>
                <Chat ref={chatRef}/>
            </div>

            <div className='max-w-160 bg-h-full bg-[#272727] rounded-2xl shadow-[12px_12px_20px_rgba(0,0,0,0.4)]'>
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

