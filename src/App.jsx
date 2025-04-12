import './app.css'
import { useEffect, useRef, useState } from 'react'
import Agent from './Agent'
import Chat from './Chat'


function App() {
  const introRef = useRef(new Audio('/intro.mp3'))
  const voiceRef = useRef(null)
  const [showNI, setShowNI] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const chatRef = useRef();

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
      voiceRef.current.pause();
    }
    voiceRef.current = new Audio(url);

    // Get duration from metadata
    voiceRef.current.addEventListener(
      'loadedmetadata',
      () => {
        const duration = voiceRef.current.duration * 1000; // Convert to ms
        voiceRef.current.play().catch((err) => {
          console.warn('Audio play error:', err);
          setSpeaking(false);
        });
        // Set timeout to stop speaking after duration
        setTimeout(() => {
          setSpeaking(false);
        }, duration);
      },
      { once: true } // Remove listener after firing
    );
  };

  const handleSendMessage = () => {
    chatRef.current.addMessage("Hi, I'm the user.", true);  // true = user
    setTimeout(() => {
      chatRef.current.addMessage("Hello! I'm the bot.", false); // false = bot
    }, 1000);
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
      <div className='absolute top-0 left-0 w-full h-full bg-[#0000000] flex items-center justify-center'>
          <div className='w-full flex items-center justify-center'>

              <Chat ref={chatRef}/>

              <Agent 
              speaking={speaking}
              gender={true}
              language={"English"}
              flag={"sh"}
              />
            </div>
      </div>

      <button className='absolute top-0 left-0 bg-[#F7971D] w-50 h-30 active:bg-gray-200 hover:cursor-pointer'
      // onClick={() => {
      //   setSpeaking(true); // Start SiriWave
      //   playVoice('/john.wav'); // Play audio, handle duration
      // }}>

      onClick={handleSendMessage}
      >

              <div>
                Click
              </div>
      </button>
    </div>
  )
}

export default App

