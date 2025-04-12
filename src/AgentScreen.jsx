import React from 'react'
import Agent from './Agent'
import Chat from './Chat'
import Microphone from './Microphone'

export default function AgentScreen(
   {chatRef, speaking, listening, gender, language, flag}
) {

    return (
        <>
        <div className='w-4/5 flex items-center justify-center bg-[#1a1a1a] rounded-4xl p-10 gap-10'>

            <div className='w-full h-full flex flex-col justify-between items-center gap-20'>
                <div className='w-150 h-120 max-h 120 overflow-y-auto flex flex-col justify-center items-center shadow-[12px_12px_20px_rgba(0,0,0,0.4)]'>
                    <Chat ref={chatRef} />
                    
                </div>
                <Microphone isRecording={listening}/>
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

