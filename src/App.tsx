import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainSpeechtoText from "./components/speechToText/SpeechToTextComponent";
import GeminiBox from "./components/speechToText/Gemini/GeminiBox";

function App() {
  return (
    <div className="App">
      <MainSpeechtoText />
    </div>
  );
}

export default App;
