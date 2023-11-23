var correctSolution = "";
var suppliedSolution = "";

const messageListener = function (message) {
  if (message.action === "send_message") {
    // Forward the message to the content script
    suppliedSolution = message.message;
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      browser.tabs.sendMessage(activeTabId, message);
    });
    browser.runtime.sendMessage({
      action: "update_css",
      inputCorrect: comparePortugueseSentences(),
    });
  }
};

function comparePortugueseSentences() {
  // Normalize both sentences
  const normalizedSolution = correctSolution
    .trim()
    .normalize("NFD")
    .toLowerCase()
    .replace(/[.,;:'"!?]/g, "");
  const normalizedGuess = suppliedSolution
    .trim()
    .normalize("NFD")
    .toLowerCase()
    .replace(/[.,;:'"!?]/g, "");

  // Compare the normalized sentences
  if (normalizedSolution === normalizedGuess) {
    return 0;
  } else if (
    normalizedSolution.replace(/[\u0300-\u036f]/g, "") ===
    normalizedGuess.replace(/[\u0300-\u036f]/g, "")
  ) {
    return 1;
  } else {
    return 2;
  }
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
