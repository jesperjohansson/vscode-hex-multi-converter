# Hex Multi-Converter

![general usage screencast](screenshots/general01.gif)

[GitHub Repository](https://github.com/jesperjohansson/vscode-hex-multi-converter)

[Marketplace Page](https://marketplace.visualstudio.com/items?itemName=Jesper.vscode-hex-multi-converter)

## Features

- Multi-select support
- Replace selected text or insert conversion as comments
- Hex to decimal conversion
  - [x] Replace
  - [x] Comment
- Hex to ASCII conversion
  - [x] Replace
  - [x] Comment
- Hex to binary conversion
  - [x] Replace
  - [x] Comment
- Decimal to hex conversion
  - [x] Replace
  - [ ] Comment
- ASCII to hex conversion
  - [x] Replace
  - [ ] Comment
- Binary to hex conversion
  - [x] Replace
  - [ ] Comment

## Usage

1. Select the text you want to convert
2. Open command palette _(Shift + Command + P (Mac) / Ctrl + Shift + P (Windows/Linux))_
3. Search "convert" or "comment" and select conversion method

![command palette](screenshots/command-palette02.png)

## Extension Settings

This extension contributes the following settings:

- `hex-multi-converter.convertEscapeCharactersToText`: (default `true`) Set to `false` to disable escape characters to text conversion (render newline instead of "\n" for example).
- `hex-multi-converter.convertControlCharactersToText`: (default `true`) Set to `false` to disable control characters to text conversion (show the ESC symbol instead of "ESC" for example).
- `hex-multi-converter.extendedMatcher`: (default `false`) Set to `true` to enable extended syntax for hexadecimal numbers. For example, when enabled 0x12345U and 0x12345u will be matched as hexadecimal numbers.

<!-- ## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension. -->
