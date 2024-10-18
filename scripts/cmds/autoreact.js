module.exports = {
    config: {
        name: "autoreact",
		      version: "1.0",
	       	author: "Max Rambo",
		      countDown: 5,
	       	role: 0,
		      shortDescription: "",
	       	longDescription: "",
		       category: "dont know ",
    },
	onStart: async function (){},
	onChat: async function ({ event ,api}) {
		if (event.body.toLowerCase().indexOf("great") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("good night") !== -1) return api.setMessageReaction("😍", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("good morning") !== -1) return api.setMessageReaction("👍", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("bye") !== -1) return api.setMessageReaction("😍", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("hello") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("hey") !== -1) return api.setMessageReaction("😍", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😢") !== -1) return api.setMessageReaction("😢", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😆") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😂") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😅") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
    
   	if (event.body.toLowerCase().indexOf("😡") !== -1) return api.setMessageReaction("😡", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("good afternoon") !== -1) return api.setMessageReaction("❤", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("good evening") !== -1) return api.setMessageReaction("😍", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("nice") !== -1) return api.setMessageReaction("👍", event.messageID,event.threadID)
}
};
