import React from 'react'
import Agent from './Agent'
import Chat from './Chat'
import Microphone from './Microphone'

export default function AgentScreen(
   {chatRef, speaking, name, listening, gender, language, flag, bio, location, imageURL}

) {

    return (
        <>
        <div className='w-4/5 flex items-center justify-center bg-[#1a1a1a] rounded-4xl p-10 gap-10'>

            <div className='w-full h-full flex flex-col justify-between items-center gap-20'>
                <div className='w-150 px-5 h-150 max-h-150 overflow-y-auto flex flex-col justify-center items-center shadow-[12px_12px_20px_rgba(0,0,0,0.4)]'>
                    <Chat ref={chatRef} /> 
                </div>
                <Microphone isRecording={listening}/>
            </div>

            <div className='max-w-160 bg-h-full bg-[#272727] rounded-2xl shadow-[12px_12px_20px_rgba(0,0,0,0.4)]'>
                <Agent
                name={name}
                speaking={speaking}
                gender={gender}
                language={language}
                flag={flag}
                bio={bio}
                imgUrl={imageURL}
                location={location}
                />
            </div>

        </div>
        </>
    )
}

