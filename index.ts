import { Client, Events, GatewayIntentBits, Partials } from "discord.js";
import "dotenv/config";

const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

bot.on("ready", () => {
  console.log(`Up and running as: ${bot.user?.username}`);
});

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      return;
    }
  }

  if (!reaction.emoji?.name?.match(/[\u{1F1E6}-\u{1F1FF}]{2}/u)) return;

  reaction.remove();
});

bot.login(process.env.TOKEN);
