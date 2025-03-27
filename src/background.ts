// @ts-ignore
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const hiddenContents = localStorage.getItem("hidden-contents");
    if (hiddenContents !== null) {
      JSON.parse(hiddenContents).map((item: string) => {
        (document.querySelector(item) as HTMLElement)!.hidden = true;
      });
    } else {
      sessionStorage.setItem("hidden-contents", "[]");
    }
  }
});
