import './app.css'
import { useEffect, useRef, useState } from 'react'
import AgentScreen from './AgentScreen'


function App() {
  const introRef = useRef(new Audio('/intro.mp3'))
  const voiceRef = useRef(null)
  const [showNI, setShowNI] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const chatRef = useRef();
  const introMessage = `Good morning, John. Had a good night's sleep? 
  Should we review your code today? Or would you like to continue pretending
  to be a girl online?`

  // Intro Animation
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
  


  const [spacePressed, setSpacePressed] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);
  const previousSpacePressed = useRef(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        sendToAPI(audioBlob);
        audioChunks.current = [];
      };
    });
  }, []);

  // Detect state change from false to true
  useEffect(() => {
    if (!mediaRecorder) return;

    if (spacePressed && !previousSpacePressed.current) {
      // spacePressed changed from false to true
      mediaRecorder.start();
    }

    if (!spacePressed && previousSpacePressed.current) {
      // spacePressed changed from true to false
      mediaRecorder.stop();
    }

    previousSpacePressed.current = spacePressed;
  }, [spacePressed, mediaRecorder]);

  const sendToAPI = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "speech.wav"); // pomembno: ime polja je "file", kot v curl
  
    try {
      const response = await fetch("/api/speech-to-text?language=en", {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Content-Type se ne nastavlja ročno pri FormData — brskalnik ga doda sam z mejo (boundary)
        },
        body: formData,
      });
  
      const result = await response.json();
      console.log("API response:", result);
    } catch (error) {
      console.error("Error sending voice to API:", error);
    }
  };
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !spacePressed) {
        console.log('Space pressed');
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        console.log('Space released');
        setSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  


  // Bot Greeting
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSpeaking(true); // Start SiriWave
      playVoice('/john.wav'); // Play audio
      handleSendMessage(introMessage, true); // Add message
    }, 5000); // Delay in milliseconds (1000 = 1 second)
  
    return () => clearTimeout(timeout); // Cleanup if unmounted early
  }, []);

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

  const handleSendMessage = (message, who) => {
    chatRef.current.addMessage(message, true);  // true = user
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
      
      {/*Agent Screen*/}
      <div className='absolute top-0 left-0 w-full h-full bg-[#0000000] flex items-center justify-center'>
          <AgentScreen chatRef={chatRef} speaking={speaking} gender={true}
           language={"English"} flag={"sh"}/>
      </div>

      {/* <button className='absolute top-0 left-0 bg-[#F7971D] w-50 h-30 active:bg-gray-200 hover:cursor-pointer'
      onClick={() => {
        setSpeaking(true); // Start SiriWave
        playVoice('/john.wav'); // Play audio, handle duration
        handleSendMessage(introMessage, true)
      }}
      >

              <div>
                Click
              </div>
      </button> */}
    </div>
  )
}

export default App

