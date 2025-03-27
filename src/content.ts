(() => {
  // content.ts - Runs inside the target webpage
  console.log("Content script loaded!");
  // const hiddenContents = localStorage.getItem("hidden-contents");
  // if (hiddenContents !== null) {
  //   JSON.parse(hiddenContents).map((item: string) => {
  //     (document.querySelector(item) as HTMLElement)!.hidden = true;
  //   });
  // } else {
  //   sessionStorage.setItem("hidden-contents", "[]")
  // }

  chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    const { selector, action } = message;
    if (action === "hide") {
      document.querySelector(selector).hidden = true;
      addSelectorToHiddenList(selector);
    } else if (action === "show") {
      document.querySelector(selector).hidden = false;
      removeSelectorFromHiddenList(selector);
    }
  });
})();
const addSelectorToHiddenList = (selector: string): void => {
  const hiddenContents = JSON.parse(localStorage.getItem("hidden-contents") || "[]");
  hiddenContents.push(selector);
  sessionStorage.setItem("hidden-contents", JSON.stringify(hiddenContents));
}

const removeSelectorFromHiddenList = (selector: string): void => {
  const hiddenContents = JSON.parse(localStorage.getItem("hidden-contents") || "[]");
  hiddenContents.splice(hiddenContents.indexOf(selector), 1);
  sessionStorage.setItem("hidden-contents", JSON.stringify(hiddenContents));
}

