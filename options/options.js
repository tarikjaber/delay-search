document.getElementById('optionsForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    let delayTime = document.getElementById('delayTime').value;
    let disableDuration = document.getElementById('disableDuration').value;

    await chrome.storage.sync.set({ delayTime, disableDuration });
    alert('Options saved.');
});

window.onload = async function () {
    let items = await chrome.storage.sync.get(['delayTime', 'disableDuration']);
    document.getElementById('delayTime').value = items.delayTime || 15;
    document.getElementById('disableDuration').value = items.disableDuration || 5;
};
