(() => {
  // content.ts - Runs inside the target webpage
  console.log("Content script loaded!");

  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    const { selector, action } = message;
    if (action === "hide") {
      document.querySelector(selector).hidden = true;
    } else if (action === "show") {
      document.querySelector(selector).hidden = false;
    }
  });
})();
