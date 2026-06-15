import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

const VoiceAssistant = ({ onCommandDetected }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Your browser doesn't support speech recognition.");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info("🎧 Listening...");
    };
    recognition.onend = () => setIsListening(false);
    recognition.onspeechstart = () => toast.success("🗣️ Speaking detected");
    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      if (onCommandDetected) onCommandDetected(speech);
    };
    recognition.onerror = (event) => {
      toast.error("Speech recognition error: " + event.error);
    };

    return recognition;
  };

  const handleVoice = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initRecognition();
    }
    recognitionRef.current.start();
  };

  return (
    <></>
    // <div className="fixed bottom-6 right-6 z-50 bg-white p-4 rounded-full shadow-xl text-center">
    //   <button
    //     onClick={handleVoice}
    //     className={`w-12 h-12 rounded-full ${
    //       isListening ? "bg-red-500" : "bg-green-600"
    //     } text-white text-xl`}
    //     aria-label="Start voice input"
    //   >
    //     🎙️
    //   </button>
    //   {transcript && (
    //     <p className="text-xs mt-2 text-gray-700 max-w-[150px]">
    //       You said: “{transcript}”
    //     </p>
    //   )}
    // </div>
  );
};

export default VoiceAssistant;
