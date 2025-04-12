import React from 'react'
import AudioVisualizer from './Siri'


export default function Agent({speaking, gender, language, flag}) {

    return (
        <div className='flex flex-col gap-6 min-h-180 min-w-120 max-w-120 border-1 rounded-3xl border-gray-400 items-center p-3'>
            <div className='relative bottom-0 right-0 w-full h-full min-h-120 rounded-2x'>
                <div className='absolute bottom-0 right-0'>
                    <img src="/mia.png" alt="" width={300}/>
                </div>
                
                <div className='absolute bottom-0'>
                    <AudioVisualizer playing={speaking}/>
                </div>
        </div>

        <div className="w-4/5 h-full grid grid-cols-3 gap-4 items-center justify-center">
            <div className="flex flex-col items-center font-semibold text-white">
                    <img src={gender ? "/female.svg" : "/male.svg"} alt="Female Icon" width={50} />
                <h1>Female</h1>
            </div>

            <div className="flex flex-col items-center font-semibold text-white">
                <img src='/language.svg' alt="Language Icon" width={50} />
                <h1>{language}</h1>
            </div>

            <div className="flex flex-col items-center font-semibold text-white w-40 gap-3 pt-3">
                <img src={`/flags/${flag}.svg`} alt="Flag" width={40} />
                <h1>United Kingdom</h1>
            </div>
        </div>

        <div className='flex flex-col w-full justify-baseline gap-2 text-white px-4'>
            <div className='font-semibold text-2xl'>
             <h1>About me</h1>
            </div>
            <div>
                <p>My name is Alice. I like nothing more than going home early on a Friday afternoon, 
                    logging into my 4Chan account and DDos-ing charity websites. I also like dogs and have
                    a pet iguana.
                </p>
            </div>
        </div>

      </div>
    )
}