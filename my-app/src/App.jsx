import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { MdAttachFile } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { useRef } from "react";
import "./App.css";
import VoiceBox from "./components/Voice-Icon";

function App() {
  const [count, setCount] = useState(0);

  const PromptRef = useRef();
  const VoiceBoxRef = useRef();
  const EnterPromptRef = useRef();

  const sendPromptToServer = async (prompt) => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      console.log("Here is the response", data);

      if (response.ok) {
        console.log("Received response correctly", data.response);
      } else {
        console.log("Some error occured", data.message);
      }
    } catch (error) {
      console.log("Network error", error);
    }
  };

  // Logic to handle Enter key press after entering prompt
  const handleEnterPress = (e) => {
    if (PromptRef.current.value != "") {
      if (e.key == "Enter" || e.type === "click") {
        const prompt = PromptRef.current.value;
        sendPromptToServer(prompt);
        PromptRef.current.value = "";
      }

      if (VoiceBoxRef.current) VoiceBoxRef.current.classList.remove("hidden");
      if (EnterPromptRef.current)
        EnterPromptRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    const handleInputPrompt = () => {
      if (PromptRef.current) {
        if (PromptRef.current.value != "") {
          if (VoiceBoxRef.current) VoiceBoxRef.current.classList.add("hidden");
          if (EnterPromptRef.current)
            EnterPromptRef.current.classList.remove("hidden");
        } else {
          if (VoiceBoxRef.current)
            VoiceBoxRef.current.classList.remove("hidden");
          if (EnterPromptRef.current)
            EnterPromptRef.current.classList.add("hidden");
        }
      }
    };

    const inputEl = PromptRef.current;
    if (inputEl) {
      inputEl.addEventListener("input", handleInputPrompt);
      inputEl.addEventListener("keydown", handleInputPrompt); // 🔄 NEW LINE
    }

    return () => {
      if (inputEl) {
        inputEl.removeEventListener("input", handleInputPrompt);
        inputEl.removeEventListener("keydown", handleInputPrompt); // 🔄 NEW LINE
      }
    };
  }, []);

  return (
    <div>
      <div className="h-[100vh] w-[100vw]">
        <div className="w-full pb-8 h-full bg-[#212121] flex justify-center">
          <div className="w-full">
            <div className="navbar px-4 h-[8vh] flex justify-between items-center w-full border-b border-[#4D4D4D]">
              <div className="hover:bg-neutral-700 hover:bg-opacity-20 p-2  cursor-pointer rounded-lg">
                <div className="w-5 h-5  font-semibold bg-edit bg-cover "></div>
              </div>
              <div className="flex items-center text-lg text-white hover:bg-neutral-700 hover:bg-opacity-20 px-2 py-1 rounded-lg cursor-pointer">
                <p>MatzGPT</p>
                <span className="mt-[1px] w-6 h-6 bg-cover bg-down-arrow"></span>
              </div>
              <div className="Log-in w-14 h-8 flex justify-center items-center bg-white hover:bg-gray-100 rounded-full cursor-pointer">
                <p className="font-semibold text-xs">Log in</p>
              </div>
            </div>
            <div className="response-box w-full h-[73vh]"></div>
            <div className="input-box w-full flex justify-center">
              <div className="w-[95%] h-[14vh] bg-[#303030] rounded-3xl">
                <input
                  ref={PromptRef}
                  className="text-md text-white placeholder-[#b1b1b1] w-full h-[7vh] px-4 focus:outline-none"
                  type="text"
                  autoFocus
                  placeholder="Ask anything"
                  onKeyDown={handleEnterPress}
                />
                <div className="flex px-3">
                  <div className="w-5/6 flex">
                    <div className="flex h-max w-[12rem] justify-between">
                      <div className="border border-[#4D4D4D] flex cursor-pointer justify-evenly pl-2 pr-3 py-2 rounded-full">
                        <MdAttachFile className="mr-2 text-white text-xl" />

                        <p className="text-white text-sm font-bold">Attach</p>
                      </div>
                      <div className="cursor-pointer flex justify-evenly pl-2 pr-3 py-2 rounded-full border border-[#4D4D4D] ">
                        <CiGlobe className="mr-2 text-white text-xl" />
                        <p className="text-white text-sm font-bold">Search</p>
                      </div>
                    </div>
                  </div>
                  <div
                    ref={VoiceBoxRef}
                    className="voice-box ml-auto flex cursor-pointer hover:bg-[#616161] transition-all duration-200 justify-center w-[90px] p-2 bg-[#515151] rounded-full"
                  >
                    <VoiceBox />
                    <div className="pl-2">
                      <p className="font-semibold text-[#ECECEC] text-sm">
                        Voice
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={handleEnterPress}
                    ref={EnterPromptRef}
                    className="hidden enter-prompt cursor-pointer ml-auto bg-gray-50 hover:bg-neutral-400 rounded-full w-10 h-10 flex justify-center items-center"
                  >
                    <div className="enter-prompt justify-center bg-arrow-top w-[16px] h-[16px] bg-cover hover:bg-opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="caution w-full h-[5vh] flex flex-col items-center">
              <p className="text-white text-xs">
                MatzGPT can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
