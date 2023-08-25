let queryHeader = document.getElementById("queryHeader");

document.getElementById("closeButton").addEventListener("click", function () {
    window.close();
});

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('query');
queryHeader.innerText = "Is \"" + myParam + "\" important?";
