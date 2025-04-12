import './app.css'
import { useEffect, useRef, useState } from 'react'
import AudioVisualizer from './Siri'

function App() {
  const introRef = useRef(new Audio('/intro.mp3'))
  const voiceRef = useRef(null)
  const [showNI, setShowNI] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Show animation
      setShowNI(true)
      // Play audio
      introRef.current.play().catch((err) => {
        console.warn("Autoplay blocked:", err)
      })
    }, 300)

    return () => clearTimeout(timeout)
  }, [])

  const playVoice = (url) => {
    if (voiceRef.current) {
      voiceRef.current.pause(); // Stop any existing audio
    }
    voiceRef.current = new Audio(url); // Assign new Audio instance
    voiceRef.current.play().catch((err) => {
      console.warn('Audio play error:', err);
    });
  };

  return (
    <div className='w-full h-screen bg-[#000000] relative'>
      {/*Intro Screen*/}
      <div className="absolute w-full h-full bg-black z-4 flex justify-center items-center intro">
        <div className="text-[100px] font-semibold text-[#FFFFFF] flex gap-2 w-full justify-center items-center">
          <div>
            <h1>Open</h1>
          </div>

          <div className={`NI w-[140px] h-[140px] bg-[#F7971D] text-[#000000] flex justify-center items-center rounded-[20px] shadow-lg opacity-0 ${
            showNI ? 'fade-in' : 'opacity-0'
          }`}>
            <h1>NI</h1>
          </div>
        </div>
      </div>
      
      {/*Main Screen*/}
      <div className='absolute top-0 left-0 w-full h-full bg-[#000000] flex items-center justify-center'>
          <div className='relative bottom-0 right-0 w-1/3 h-1/2'>
            <div className='absolute bottom-0 right-0'>
              <img src="/mia.png" alt="" width={300}/>
            </div>
            
            <div className='absolute bottom-0'>
              <AudioVisualizer playing={speaking}/>
            </div>
          </div>
      </div>

      <button className='absolute top-0 left-0 bg-white w-50 h-30 active:bg-gray-200 hover:cursor-pointer'
      onClick={() => {
        setSpeaking(!speaking)
        playVoice('/sample.wav')
        setSpeaking(!speaking)
      }}>
              <div>
                Click
              </div>
      </button>
    </div>
  )
}

export default App

