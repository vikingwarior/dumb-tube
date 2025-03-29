console.log("Background Service Worker Initializing");

// Add an install listener
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
});

// Add a runtime message listener for testing
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "CHECK_BACKGROUND") {
    console.log("Background Service Worker Received Check Message");
    sendResponse({ status: "READY" });
  }
});

// Optional: Periodic console log to confirm worker is alive
setInterval(() => {
  console.log("Background Service Worker is Active");
}, 10000); // Log every minute


chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
  if (changeInfo.status === "complete") {
    const hiddenItemsList = localStorage.getItem("hidden-items");
    if (hiddenItemsList !== null) {
      const hiddenItems = JSON.parse(hiddenItemsList);
      hiddenItems.forEach((item: string) => {
        chrome.tabs.sendMessage(tabId, {
          action: "hide",
          selector: item
        });
      });
    } else {
      localStorage.setItem("hidden-items", "[]");
    }
  }
});