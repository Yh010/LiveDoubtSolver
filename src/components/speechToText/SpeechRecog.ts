import { useEffect, useState } from "react";

let recogniton: any = null;
let SpeechRecognition = null;

if ("webkitSpeechRecognition" in window) {
    SpeechRecognition = window.webkitSpeechRecognition;
    recogniton = new SpeechRecognition();
    recogniton.continuous = true;
    recogniton.lang = "en-US";
}

const useSpeechRecognition = () => { 
    const [text, settext] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recogniton) return;
        
        recogniton.onresult = (event: SpeechRecognitionEvent) => {
            console.log("onresult event: ", event);
            settext(event.results[0][0].transcript)
            recogniton.stop();
            setIsListening(false);
        };
    }, []);

    const startListening = () => {
        settext('')
        setIsListening(true)
        recogniton.start()
    }

    const stopListening = () => {
        setIsListening(false);
        recogniton.stop();
    };


    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport : !!recogniton,
    }


};


export default useSpeechRecognition;
