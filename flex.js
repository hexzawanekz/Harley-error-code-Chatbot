exports.newUndefinedMemberMessage = () => {
  return {
    type: "flex",
    altText: "Welcome New Member",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "สมาชิกใหม่",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: `ยินดีต้อนรับเข้ากลุ่มครับ`,
            margin: "md",
            wrap: true,
          },
          {
            type: "text",
            text: "แนะนำตัวด้วยครับ ชื่ออะไร อยู่แถวไหนครับ",
            margin: "md",
            wrap: true,
          },
        ],
      },
    },
  };
};

exports.newManualMessage = () => {
  return {
    type: "flex",
    altText: "Pan america 2021 manual",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "PanAm คู่มือ / manual",
            weight: "bold",
            size: "xl",
          },
          {
            type: "button",
            style: "primary",
            action: {
              type: "uri",
              label: "DownLoad",
              uri: "https://drive.google.com/file/d/1VeDLNtRjmWml-YE3q1FUpaaUw1n_3NoO/view?usp=drive_link",
            },
          },
        ],
      },
    },
  };
};

exports.newErrorMessage = (phrase, response) => {
  return {
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
            text: `Code: ${phrase}`,
            wrap: true,
            margin: "md",
          },
          {
            type: "text",
            text: `Detail: ${response}`,
            wrap: true,
            margin: "md",
          },
        ],
      },
    },
  };
};

exports.newImageMessage = (text) => {
  return {
    type: "flex",
    altText: "Image Text",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Image Text",
            weight: "bold",
            size: "xl",
          },
          {
            type: "text",
            text: text,
            wrap: true,
            margin: "md",
          },
        ],
      },
    },
  };
};

// exports.newWelcomeMemberMessage = (displaynName) => {
//   return {
//     type: "flex",
//     altText: "Welcome New Member",
//     contents: {
//       type: "bubble",
//       body: {
//         type: "box",
//         layout: "vertical",
//         contents: [
//           {
//             type: "text",
//             text: "สมาชิกใหม่",
//             weight: "bold",
//             size: "xl",
//           },
//           {
//             type: "text",
//             text: `ยินดีต้อนรับ พี่ , ${displaynName}`,
//             margin: "md",
//             wrap: true,
//           },
//           {
//             type: "text",
//             text: "แนะนำตัวด้วยครับ ชื่ออะไร อยู่แถวไหนครับ",
//             margin: "md",
//             wrap: true,
//           },
//         ],
//       },
//     },
//   };
// };
