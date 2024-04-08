import useSpeechRecognition from "./SpeechRecog";

const MainSpeechtoText = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <div style={{ textAlign: "center" }}>
      {hasRecognitionSupport ? (
        <>
          <h1>Speech-to-Text</h1>
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={startListening}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                marginRight: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Start Listening
            </button>
            <button
              onClick={stopListening}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Stop Listening
            </button>
          </div>

          {isListening && <div>Listening...</div>}
          <div style={{ marginTop: "20px", fontSize: "18px" }}>{text}</div>
        </>
      ) : (
        <h1>Speech recognition is not supported in this browser.</h1>
      )}
    </div>
  );
};
export default MainSpeechtoText;
