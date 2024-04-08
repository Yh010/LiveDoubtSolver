import { useState, useEffect } from "react";
import runChat from "./geminiconfig";

interface GeminiBoxProps {
  text: string;
}

const GeminiBox: React.FC<GeminiBoxProps> = ({ text }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  useEffect(() => {
    setInput(text);
  }, [text]);

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSubmit = async (input: string) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    const response = await runChat(input);
    let responseArr = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArr.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArr[i];
      } else {
        newResponse += "<b>" + responseArr[i] + "</b>";
      }
    }
    let finalResp = newResponse.split("*").join("</br>");
    let finalRespArr = finalResp.split(" ");
    for (let i = 0; i < finalRespArr.length; i++) {
      const nextWord = finalRespArr[i];
      delayPara(i, nextWord + "  ");
    }
    setLoading(false);
    setInput("");
  };

  return (
    <div className="flex justify-end">
      {!showResult ? (
        <div className="text-center">
          <p className="text-lg font-semibold">Tell me what you want to know</p>
        </div>
      ) : (
        <div className="result">
          <div className="result-title">
            <p className="font-medium">{recentPrompt}</p>
          </div>
          <div className="result-data">
            {loading ? (
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            ) : (
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: resultData }}
              ></p>
            )}
          </div>
        </div>
      )}
      <div className="search-box mt-4">
        <input
          className="border border-gray-300 rounded-md py-2 px-4 w-3/4"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything"
        />
        <button
          onClick={() => onSubmit(input)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GeminiBox;
