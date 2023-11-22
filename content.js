// content.js
function queryAndUpdateElement() {
  elem = document.getElementsByClassName("portuguese-phrase-holder");
  if (elem.length !== 0) {
    browser.runtime.sendMessage({
      action: "activate_extension",
      portuguese_phrase: (portuguese_phrase = document.getElementsByClassName(
        "portuguese-phrase-holder"
      )[1].textContent),
    });
  } else {
    console.debug("could not find translation object (yet)");
  }
}

// Perform the initial query and setup
queryAndUpdateElement();

// Listen for changes to the DOM, and re-run the query when the DOM changes
const observer = new MutationObserver(queryAndUpdateElement);
observer.observe(document.body, { childList: true, subtree: true });

browser.runtime.onMessage.addListener(function (message) {
  if (message.action === "send_message") {
    document.getElementById("ready-to-check").click();
  }
});

browser.runtime.onMessage.addListener(function (button) {
  if (button === "clickCorrect") {
    document.getElementById("select-correct-guess").click();
  }
});

browser.runtime.onMessage.addListener(function (button) {
  if (button === "clickWrong") {
    document.getElementById("select-wrong-guess").click();
  }
});
