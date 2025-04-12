import React from 'react'
import AudioVisualizer from './Siri'


export default function Agent({speaking, name, gender, language, flag, bio}) {

    return (
        <div className='flex flex-col gap-6 min-h-180 min-w-120 max-w-120rounded-3x items-center p-10'>


        <div className='relative bottom-0 right-0 w-full h-full min-h-120 rounded-2x'>

                <div className='absolute top-10 left-10 font-semibold text-[#636363] text-[60px]'>
                    <h1>{name}</h1>
                </div>

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
                <p>{bio}
                </p>
            </div>
        </div>

      </div>
    )
}