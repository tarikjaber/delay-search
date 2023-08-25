// Initialize the redirected flag in storage
let redirectingBack = false;

async function redirect(originalUrl, tabId, searchQuery) {
    let items = await chrome.storage.sync.get(['delayTime', 'disableDuration']);
    let delayTime = (items.delayTime || 15) * 1000; // Convert to milliseconds

    try {
        await chrome.tabs.update(tabId, { url: chrome.runtime.getURL("waiting_room/waiting_room.html?query=" + searchQuery) });
        setTimeout(async function () {
            redirectingBack = true;
            await chrome.tabs.update(tabId, { url: originalUrl });
        }, delayTime);
    } catch (error) {
        console.log("Error: " + error.message);
    }
}

// Rest of your code...

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
    console.log("redirectingBack", redirectingBack)
    console.log("changeInfo", changeInfo)
    if (changeInfo.url && !redirectingBack) {
        console.log(changeInfo.url)
        // do something here
        console.log(tab.url)
        if (tab.url.includes("youtube.com/results?search_query=") || tab.url.includes("google.com/search?q=") || tab.url.includes("https://www.bing.com/search?q=")) {
            console.log(tab)
            let searchQuery;
            if (tab.url.includes("youtube.com/results?search_query=")) {
                searchQuery = tab.url.split("youtube.com/results?search_query=")[1].split("&")[0]
            } else if (tab.url.includes("google.com/search?q=")) {
                searchQuery = tab.url.split("google.com/search?q=")[1].split("&")[0]
            } else if (tab.url.includes("https://www.bing.com/search?q=")) {
                searchQuery = tab.url.split("https://www.bing.com/search?q=")[1].split("&")[0]
            }
            redirect(tab.url, tab.id, searchQuery)
        }
    }
    if (redirectingBack) {
        setTimeout(function () {
            redirectingBack = false;
        }, 50)
    }
})

chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage(() => console.log('options page opened'))
})
