async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  let url = new URL(tab.url);
  let domain = url.hostname;
  return domain;
}
let checkbox = document.getElementById("checkbox");
checkbox.onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0].url;
        console.log(tab);
        var url = new URL(tab);
        var domain = url.hostname;
        console.log(domain);
        if (checkbox.checked) {
            chrome.storage.local.set({ [`${domain}`]: true });
        } else {
            chrome.storage.local.set({ [`${domain}`]: false });
        }
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id, allFrames: true },
            files: ["content_script.js"],
        });
    });
};
