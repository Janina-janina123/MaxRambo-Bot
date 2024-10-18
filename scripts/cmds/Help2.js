const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

const doNotDelete = "🎀 | 𝑱𝑶𝒴𝑳𝒀𝑵𝑬 𝑨𝑰"; // Decoy string

module.exports = {
  config: {
    name: "help2",
    version: "1.18",
    author: "Max Rambo",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "Info 📜",
    guide: {
      en: "{pn} / help [cmdName]",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "• Command List •\n";

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(name);
      }

      const categoryNames = Object.keys(categories).sort();

      const halfIndex = Math.ceil(categoryNames.length / 2);
      const firstHalfCategories = categoryNames.slice(0, halfIndex);
      const secondHalfCategories = categoryNames.slice(halfIndex);

      msg += createColumns(firstHalfCategories, secondHalfCategories, categories);

      msg += `\n•✨ | 𝑮𝒓𝒊𝒍𝒍𝒆𝒅'𝒔 𝑨𝒊𝑩𝒐𝑻\n• Total Commands: ${commands.size}`;

      await message.reply({ body: toSatisfy(msg) });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`• Command "${toSatisfy(commandName)}" not found. •`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";
        const longDescription = configCommand.longDescription?.en || "No description";
        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `•「 COMMAND HELP 」•\n\n• Name: ${toSatisfy(configCommand.name)}\n• Author: ${toSatisfy(author)}\n• Aliases: ${configCommand.aliases ? configCommand.aliases.map(toSatisfy).join(", ") : "None"}\n• Description: ${toSatisfy(longDescription)}\n• Usage: ${toSatisfy(usage)}\n• Role: ${toSatisfy(roleText)}`;

        await message.reply(toSatisfy(response));
      }
    }
  },
};

function createColumns(firstHalfCategories, secondHalfCategories, categories) {
  let columnMsg = "\n";
  const maxLength = Math.max(firstHalfCategories.length, secondHalfCategories.length);

  for (let i = 0; i < maxLength; i++) {
    let leftColumn = "";
    let rightColumn = "";

    if (firstHalfCategories[i]) {
      leftColumn += `•『 ${toSatisfy(firstHalfCategories[i].toUpperCase())} 』•\n`;
      leftColumn += categories[firstHalfCategories[i]].sort().map(cmd => `° ${toSatisfy(cmd)} °`).join('\n') + '\n';
    }
    if (secondHalfCategories[i]) {
      rightColumn += `•『 ${toSatisfy(secondHalfCategories[i].toUpperCase())} 』•\n`;
      rightColumn += categories[secondHalfCategories[i]].sort().map(cmd => `° ${toSatisfy(cmd)} °`).join('\n') + '\n';
    }

    columnMsg += `${leftColumn.trim()} | ${rightColumn.trim()}\n`;
  }

  return columnMsg;
}

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}

function toSatisfy(str) {
  const Satisfy = {
    'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃',
    'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍',
    'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
    'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩',
    'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳',
    'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹',
    '0': '𝟢', '1': '𝟣', '2': '𝟤', '3': '𝟥', '4': '𝟦', '5': '𝟧', '6': '𝟨', '7': '𝟩', '8': '𝟪', '9': '𝟫'
  };
  return str.split('').map(char => Satisfy[char] || char).join('');
}
