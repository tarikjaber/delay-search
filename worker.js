// Initialize the redirected flag in storage
let redirectingBack = false;

async function redirect(originalUrl, tabId) {
    // Mark as redirected to prevent repeating
    let tab = await chrome.tabs.update(tabId, { url: chrome.runtime.getURL("waiting_room/waiting_room.html") })
    setTimeout(async function () {
        redirectingBack = true;
        await chrome.tabs.update(tabId, { url: originalUrl })
    }, 2000); // 15 seconds delay
}

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
    console.log("redirectingBack", redirectingBack)
    console.log("changeInfo", changeInfo)
    if (changeInfo.url && !redirectingBack) {
        console.log(changeInfo.url)
        // do something here
        if (tab.url.includes("youtube.com/results?search_query=") || tab.url.includes("google.com/search?q=") || tab.url.includes("https://www.bing.com/search?q=")) {
            console.log(tab)
            redirect(tab.url, tab.id)
        }
    }
    if (redirectingBack) {
        setTimeout(function () {
            redirectingBack = false;
        }, 50)
    }
}
);
