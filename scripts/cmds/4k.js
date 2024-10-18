const axios = require("axios");

module.exports.config = {
  name: "4k",
  aliases: ["4k", "remini"],
  category: "enhanced",
  author: "Max Rambo"
};

module.exports.onStart = async ({ api, event, args }) => {
  try {

    if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
      return api.sendMessage("Please reply to an image with the command.", event.threadID, event.messageID);
    }


    const Romim = event.messageReply?.attachments[0]?.url;


    const apiUrl = `https://mostakim.onrender.com/remini?input=${encodeURIComponent(Romim)}`;
 

    const imageStream = await axios.get(apiUrl,{
      responseType: 'stream'
    });


    api.sendMessage({
      body: "Here is your enhanced photo",
      attachment: imageStream.data
    }, event.threadID, event.messageID);

  } catch (e) {
    api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
  }
};
