console.log("Content script loaded!");chrome.runtime.onMessage.addListener((o,e,c)=>{o.action==="change_bg"&&(document.body.style.backgroundColor=o.color,c({status:"success",color:o.color}))});
