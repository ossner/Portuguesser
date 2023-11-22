document.addEventListener("DOMContentLoaded", function () {
  const correctButton = document.getElementById("clickCorrect");
  const incorrectButton = document.getElementById("clickWrong");
  const sendMessageButton = document.getElementById("sendMessage");
  const messageInput = document.getElementById("messageInput");

  correctButton.disabled = true;
  incorrectButton.disabled = true;

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
    messageInput.style.backgroundColor = "white"
    toggleButtonStates(false, true, true);
  }

  function toggleButtonStates(
    sendDisabled,
    correctDisabled,
    incorrectDisabled
  ) {
    sendMessageButton.disabled = sendDisabled;
    correctButton.disabled = correctDisabled;
    incorrectButton.disabled = incorrectDisabled;
  }

  sendMessageButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  correctButton.addEventListener("click", handleCorrectButtonClick);
  incorrectButton.addEventListener("click", handleIncorrectButtonClick);
  browser.runtime.onMessage.addListener(function (message) {
    if (message.action === "update_css") {
        if (message.inputCorrect) {
            messageInput.style.backgroundColor = "green";
        } else {
            messageInput.style.backgroundColor = "red";
        }
    }
  });
});
