var correctSolution = "";
var suppliedSolution = "";

const messageListener = function (message) {
  if (message.action === "send_message") {
    // Forward the message to the content script
    suppliedSolution = message.message
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      browser.tabs.sendMessage(activeTabId, message);
    });
    console.log("correct: " + correctSolution);
    console.log("supplied: " + suppliedSolution);
    browser.runtime.sendMessage({
      action: "update_css",
      inputCorrect: validateInput(),
    });
  }
};

function validateInput() {
  return (
    correctSolution.trim().toLowerCase() ===
    suppliedSolution.trim().toLowerCase()
  );
}

const buttonListener = function (button) {
  if (button.action === "clickWrong" || button.action === "clickCorrect") {
    // Forward the message to the content script
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      browser.tabs.sendMessage(activeTabId, button.action);
    });
  }
};

const solutionListener = function (message) {
  if (message.action === "activate_extension") {
    // Forward the message to the content script
    correctSolution = message.portuguese_phrase;
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      browser.tabs.sendMessage(activeTabId, message);
    });
  }
};

browser.runtime.onMessage.addListener(messageListener);
browser.runtime.onMessage.addListener(solutionListener);
browser.runtime.onMessage.addListener(buttonListener);
