export const triggerBrowserMessage = (
  action: string,
  elementSelector: string
) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: action,
        selector: elementSelector,
      });
    }
  });
};
