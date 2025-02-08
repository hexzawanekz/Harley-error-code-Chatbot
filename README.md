# Harley Davidson Error Code for Line Chatbot

A LINE messaging bot that helps users identify and understand error codes through text matching and image recognition capabilities. Built with Node.js and Firebase Functions.

## Features

- **Text-based Error Code Lookup**:

  - Matches user input with known error codes using fuzzy string matching
  - Supports both exact matches and similar text patterns
  - Responds with detailed error information in a clean, formatted message

- **Image Recognition**:

  - Extracts error codes from uploaded images using OCR (Optical Character Recognition)
  - Processes and cleans extracted text to improve matching accuracy
  - Supports multiple error code detection from a single image

- **Manual/Guide Access**:
  - Quick access to manual/guide through keywords "คู่มือ" or "manual"
  - Provides user guidance in both Thai and English

## Technologies Used

- Node.js
- Firebase Cloud Functions
- LINE Messaging API
- Tesseract.js for OCR
- String-similarity for fuzzy matching

## Prerequisites

- Node.js installed
- Firebase CLI installed
- LINE Developer Account
- Firebase Project

## Setup

1. Clone the repository
2. Install dependencies:
3. Configure environment variables:

   - LINE Channel Access Token
   - LINE Channel Secret

4. Deploy to Firebase:

## Project Structure

- `index.js`: Main application logic
- `flex.js`: LINE Flex message templates
- `line.util.js`: LINE API utility functions
- `code.json`: Database of error codes and their descriptions

## Error Code Format

The error codes and responses are stored in `code.json` with the following structure:
