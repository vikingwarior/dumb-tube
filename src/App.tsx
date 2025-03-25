import React from "react";

const App: React.FC = () => {
  const hideElements = (action: string, elementSelector: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: action,
          selector: elementSelector,
        });
      }
    });
  };

  return (
    <div>
      <h1>Chrome Extension</h1>
      <button
        onClick={() => {
          hideElements("hide", "#logo-icon > span > div");
          console.log("hi");
        }}
      >
        Change BG to Light Blue
      </button>
    </div>
  );
};

export default App;
