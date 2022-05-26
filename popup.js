// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        // Initialize button with user's preferred color
        let changeColor = document.getElementById("changeColor");

        chrome.storage.sync.get("color", ({ color }) => {
            changeColor.style.backgroundColor = color;
        });
        // When the button is clicked, inject setPageBackgroundColor into current page
        changeColor.addEventListener("click", async () => {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setPageBackgroundColor,
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get("tokens", ({ tokens }) => {
        tokens.forEach(token => {
            var div = document.createElement('div');
            div.className = 'flex';
            div.innerHTML = token;
            document.body.appendChild(div);
        });
    });

}, false);