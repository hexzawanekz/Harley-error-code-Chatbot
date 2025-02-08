const flex = require("./flex");
const line = require("./line.util");
const fs = require("fs").promises;
const path = require("path");
const { onRequest } = require("firebase-functions/v2/https");
const stringSimilarity = require("string-similarity");
const tesseract = require("tesseract.js");
const CircularJSON = require("circular-json");

// const util = require("util");
// const fs = require("fs");
// const path = require("path");
// const { pipeline } = require("stream");

// Load the JSON data
async function loadJsonData() {
  const filePath = path.join(__dirname, "code.json");
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

async function handleErrorEvent(event) {
  if (!event.message || !event.message.text) {
    return;
  }

  if (event.message.text === "คู่มือ" || event.message.text === "manual") {
    await line.reply(event.replyToken, [flex.newManualMessage()]);
    return;
  }

  const jsonData = await loadJsonData();

  for (const item of jsonData) {
    const similarity = stringSimilarity.compareTwoStrings(
      event.message.text,
      item.Phrase
    );

    if (similarity > 0.7) {
      // Adjust the threshold as needed
      await line.reply(event.replyToken, [
        flex.newErrorMessage(item.Phrase, item.Response),
      ]);
      break; // Exit the loop once a match is found
    }
  }
}

async function handleImageEvent(event) {
  const response = await line.downloadContent(event.message.id);
  const buffer = Buffer.from(response, "binary");
  const {
    data: { text },
  } = await tesseract.recognize(buffer, "eng", {
    logger: (m) => console,
    tessedit_pageseg_mode: tesseract.PSM.AUTO, // Page segmentation mode
    tessedit_char_whitelist: " 0123456789ABCDEFPU", // Character whitelist
    dpi: 400, // Set DPI for better image recognition
  });

  // console.log(`OCR Text: ${text}`);

  // Post-process the text to replace unwanted special characters
  const processedText = text.replace(/[^0-9a-zA-Z ]/g, (char) => {
    switch (char) {
      case "€":
        return "C";
      case "I":
        return "1";
      // Add more cases as needed
      default:
        return "";
    }
  });

  // console.log(`Processed OCR Text: ${processedText}`);

  const jsonData = await loadJsonData();
  const matches = jsonData.filter((item) =>
    processedText.includes(item.Phrase)
  );

  if (matches.length > 0) {
    // console.log(
    //   `Found matching phrases: ${matches
    //     .map((match) => match.Phrase)
    //     .join(", ")} in the OCR text.`
    // );
    const replyMessages = matches.map((match) => ({
      type: "flex",
      altText: "Error Code",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "Error Code",
              weight: "bold",
              size: "xl",
              color: "#FF0000",
            },
            {
              type: "text",
              text: `Code: ${match.Phrase}`,
              wrap: true,
              margin: "md",
            },
            {
              type: "text",
              text: `Detail: ${match.Response}`,
              wrap: true,
              margin: "md",
            },
          ],
        },
      },
    }));
    await line.reply(event.replyToken, replyMessages);
  }
}

exports.webhook = onRequest(async (request, response) => {
  if (request.method !== "POST") {
    return response.send(request.method);
  }
  const events = request.body.events;
  for (const event of events) {
    if (event.type === "memberJoined") {
      // Get LINE Profile for Send Display Name to Flex
      await line.reply(event.replyToken, [flex.newUndefinedMemberMessage()]);
    }

    if (event.type === "message") {
      await handleErrorEvent(event);
    }

    if (event.message.type === "image") {
      await handleImageEvent(event);
    }

    return response.end();
  }
  return response.end();
});
