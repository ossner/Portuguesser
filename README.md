# Portuguesser

## Introduction

Portuguesser is an open-source Firefox extension specifically designed for users of practiceportuguese.com. It enhances the learning experience by allowing users to study Portuguese through an interactive flashcard system. Instead of mentally solving flashcards, users can enter text responses, making the learning process more engaging and effective.

## Features

- Interactive flashcard study tool.
- Text input for answers enhances memory recall.
- Seamless integration with practiceportuguese.com.

## Installation

### Prerequisites

- Firefox browser.
- Basic understanding of Firefox extensions.

### Steps to Load the Extension Locally

1. **Download the Extension**: Clone or download the extension files from this repository.

    ```bash
    git clone https://github.com/ossner/Portuguesser.git
    ```

2. **Open Firefox**: Launch your Firefox browser.

3. **Access Extension Settings**: 
    - Type `about:debugging` in the address bar.
    - Go to the "This Firefox" tab.

4. **Load Temporary Add-on**:
    - Click on "Load Temporary Add-on".
    - Navigate to the directory where you downloaded Portuguesser.
    - Select `manifest.json`

5. **Extension Activation**: The extension should now be active. You will see "Portuguesser" listed among your active extensions.

## Usage

1. **Visit PracticePortuguese.com**: Log in to your account.

2. **Open Smart Review ([flashcards](https://www.practiceportuguese.com/flash-cards/))**: As you encounter flashcards, click on the Portuguesser extension to type your answers.

3. **Feedback and Correction**: Receive immediate feedback and corrections from the extension.
   1. Green: Answer is correct, only puntuation might be off.
   2. Yellow: Wrong diacritics
   3. Red: Missing words, sentence structure or typos.

## Contributing

We welcome contributions from the community. If you would like to contribute, please fork the repository and submit a pull request.
