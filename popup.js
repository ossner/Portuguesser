document.addEventListener("DOMContentLoaded", function () {
  const correctButton = document.getElementById("acceptButton");
  const incorrectButton = document.getElementById("rejectButton");
  const checkGuessButton = document.getElementById("checkButton");
  const messageInput = document.getElementById("answerInput");

  correctButton.disabled = true;
  incorrectButton.disabled = true;
  lastAnswerCorrect = false;

  function sendMessage() {
    const message = messageInput.value;
    browser.runtime.sendMessage({ action: "send_message", message });
    toggleButtonStates(true, false, false);
  }

  function handleCorrectButtonClick() {
    browser.runtime.sendMessage({ action: "clickCorrect" });
    resetControls();
  }

  function handleIncorrectButtonClick() {
    browser.runtime.sendMessage({ action: "clickWrong" });
    resetControls();
  }

  function resetControls() {
    messageInput.value = "";
    messageInput.style.backgroundColor = "white";
    lastAnswerCorrect = false;
    toggleButtonStates(false, true, true);
  }

  function toggleButtonStates(
    sendDisabled,
    correctDisabled,
    incorrectDisabled
  ) {
    checkGuessButton.disabled = sendDisabled;
    correctButton.disabled = correctDisabled;
    incorrectButton.disabled = incorrectDisabled;
  }

  checkGuessButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (!checkGuessButton.disabled) {
        // If the user is in the initial screen, enter can be used to send a message
        sendMessage();
      } else {
        if (lastAnswerCorrect) {
          // As a shortcut. If the entered answer was correct, the user can press enter to accept the answer
          handleCorrectButtonClick();
        }
      }
    }
  });

  correctButton.addEventListener("click", handleCorrectButtonClick);
  incorrectButton.addEventListener("click", handleIncorrectButtonClick);

  browser.runtime.onMessage.addListener(function (message) {
    if (message.action === "update_css") {
      switch (message.inputCorrect) {
        case 0:
          messageInput.style.backgroundColor = "#4CAF50";
          lastAnswerCorrect = true;
          break;
        case 1:
          messageInput.style.backgroundColor = "#FFC107";
          break;
        case 2:
          messageInput.style.backgroundColor = "#FF5252";
          break;
      }
    }
  });
});
