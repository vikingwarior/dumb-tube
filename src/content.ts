const checkBackgroundWorker = () => {
  chrome.runtime.sendMessage({ type: "CHECK_BACKGROUND" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Failed to connect to background script", chrome.runtime.lastError);
      return;
    }
    
    if (response && response.status === "READY") {
      console.log("Background Service Worker is Loaded and Responsive");
    }
  });
}

(() => {
  // content.ts - Runs inside the target webpage
  console.log("Content script loaded!");
  checkBackgroundWorker();
  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    const { selector, action } = message;
    if (action === "hide") {
      document.querySelector(selector).hidden = true;
    } else if (action === "show") {
      document.querySelector(selector).hidden = false;
    }
  });
})();