// content.ts - Runs inside the target webpage
console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "change_bg") {
    document.body.style.backgroundColor = message.color;
    sendResponse({ status: "success", color: message.color });
  }
});
