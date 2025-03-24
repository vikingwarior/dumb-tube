import React from "react";

const App: React.FC = () => {
  const changeBackgroundColor = (color: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "change_bg", color });
      }
    });
  };

  return (
    <div>
      <h1>Chrome Extension</h1>
      <button onClick={() => {
          changeBackgroundColor("lightblue")
          console.log("hi");
          document.body.style.backgroundColor = "green";
        }}>
        Change BG to Light Blue
      </button>
    </div>
  );
};

export default App;