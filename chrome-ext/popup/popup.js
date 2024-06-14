let checkbox = document.getElementById("checkbox");
checkbox.onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0].url;
        var url = new URL(tab);
        var domain = url.hostname;
        if (checkbox.checked) {
            chrome.storage.local.set({ [`${domain}`]: true });
        } else {
            chrome.storage.local.set({ [`${domain}`]: false });
        }

    });
};
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0].url;
    var url = new URL(tab);
    var domain = url.hostname;
    chrome.storage.local.get(domain, (data) => {
        if (data[domain]) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
})

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0].url;
    var url = new URL(tab);
    var domain = url.hostname;
    chrome.storage.local.get(domain, (data) => {
        if (data[domain]) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
});
