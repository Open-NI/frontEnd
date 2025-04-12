import './app.css'
import { useEffect, useRef, useState } from 'react'

function App() {
  const audioRef = useRef(new Audio('/intro.mp3'))
  const [showNI, setShowNI] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Show animation
      setShowNI(true)
      // Play audio
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay blocked:", err)
      })
    }, 300)

    return () => clearTimeout(timeout)
  }, [])

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
      <div className='absolute w-full h-full bg-[#000000]'>

      </div>
    </div>
  )
}

export default App

