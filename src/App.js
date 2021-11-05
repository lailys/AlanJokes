import React, { useEffect, useState } from "react";
import "./App.css";

import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  const [options, setOptions] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [voiceActivated, setVoiceActivated] = useState(false);
  const [msg, setMsg] = useState([]);
  const [reset, setReset] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const [alanBtnInstance, setAlanBtnInstance] = useState(null);
  // const [alanBtnInstance, setAlanBtnInstance] = useState(null);

  useEffect(() => {
    setAlanBtnInstance(
      alanBtn({
        key: "5aed8e6ae89b288c64709d9be932fc782e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: (commandData) => {
          if (commandData.command === "activateVoice") {
            setVoiceActivated(true);
          }
          if (commandData.command === "getCategories") {
            setMsg([]);
            setActiveCategory("");
            setActiveWord(null);
            setOptions(commandData.data);
          }
          if (commandData.command === "pickedCategory") {
            setActiveCategory(commandData.category);
          }
          if (commandData.command === "specifiedWord") {
            setActiveWord(commandData.word);
          }
          if (commandData.command === "getJoke") {
            commandData.joke.type === "single" ||
            commandData.joke.type === "err"
              ? setMsg([commandData.joke.joke])
              : setMsg([
                  commandData.joke.jokeSetup,
                  commandData.joke.jokeDelivery,
                ]);
          }
          if (commandData.command === "reset") {
            setVoiceActivated(false);
            setReset(true);
            setActiveCategory("");
            setActiveWord(null);
            setOptions([]);
            setMsg([]);
          }
        },
      })
    );
  }, []);

  useEffect(() => {
    if (reset) alanBtnInstance.deactivate();
  }, [reset]);
  const renderOptions = (opts) => {
    let arr = [];
    for (const o in opts) {
      arr.push(
        <div
          className="category-container"
          style={{
            width:
              activeCategory !== "" &&
              activeCategory.toLowerCase() === o.toLowerCase()
                ? "100%"
                : activeCategory !== "" &&
                  activeCategory.toLowerCase() !== o.toLowerCase()
                ? "0"
                : "50%",
            height:
              activeCategory !== "" &&
              activeCategory.toLowerCase() === o.toLowerCase()
                ? "100%"
                : activeCategory !== "" &&
                  activeCategory.toLowerCase() !== o.toLowerCase()
                ? "0"
                : "25%",
          }}
          key={o}
        >
          <div
            className="joke-container"
            style={{
              background: opts[o],
              borderRadius:
                activeCategory !== "" &&
                activeCategory.toLowerCase() === o.toLowerCase()
                  ? "30px 30px 30px 30px"
                  : `${o === "Any" ? "30px" : "0"} ${
                      o === "Christmas" ? "30px" : "0"
                    } 0 ${o === "Spooky" ? "30px" : "0"}`,
            }}
          >
            <div
              className="left-eye"
              style={{
                display:
                  activeCategory !== "" &&
                  activeCategory.toLowerCase() !== o.toLowerCase()
                    ? "none"
                    : "flex",
              }}
            >
              <div className="eye-center"></div>
            </div>
            <div
              className="right-eye"
              style={{
                display:
                  activeCategory !== "" &&
                  activeCategory.toLowerCase() !== o.toLowerCase()
                    ? "none"
                    : "flex",
              }}
            >
              <div
                className="eye-center"
                style={{
                  display:
                    activeCategory !== "" &&
                    activeCategory.toLowerCase() !== o.toLowerCase()
                      ? "none"
                      : "flex",
                }}
              ></div>
            </div>
            <div
              className="joke-text"
              style={{
                opacity:
                  msg.length === 0
                    ? "0"
                    : msg.length !== 0 &&
                      activeCategory.toLowerCase() === o.toLowerCase()
                    ? "1"
                    : "0",
              }}
            >
              {msg[0] && msg.map((m, i) => <div key={i}>{m}</div>)}
            </div>
            <div
              className="text-container"
              style={{
                display:
                  activeCategory !== "" &&
                  activeCategory.toLowerCase() !== o.toLowerCase()
                    ? "none"
                    : "flex",
              }}
            >
              {o}
            </div>
          </div>
        </div>
      );
    }
    return arr;
  };
  return (
    <div className="App">
      <div
        className="main-container"
        style={{ opacity: options && options.length === 0 ? 1 : 0 }}
      >
        <div className="left-eye">
          <div className="eye-center"></div>
        </div>
        <div className="right-eye">
          <div className="eye-center"></div>
        </div>
        <div
          className="text-container-main"
          id={voiceActivated ? "text-container-main-movment" : ""}
        >
          I am here to make you laugh, <br />
          Press the button and
          <br />
          say something,
          <br />
          anything, like: <br />
          Alan... <br />
        </div>
      </div>

      <div
        className="main-container"
        style={{ opacity: options && options.length === 0 ? 0 : 1 }}
      >
        {renderOptions(options)}
      </div>
    </div>
  );
}

export default App;
