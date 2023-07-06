import { NextApiRequest, NextApiResponse } from "next"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, MessageFlags } from "discord-api-types/v10"
import withDiscordInteraction from "./../../../middlewares/discord-interaction"
import withErrorHandler from "./../../../middlewares/error-handler"
import { TranslateTextWithDiscordCommandOptions } from "../../../services/translations";

const BASE_RESPONSE = { type: 4 }
const INVALID_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { content: "You have executed a command that does not exist in my directory. Try again later or run **/bot-support** to contact the developers." } }

const BOT_SUPPORT_RESPONSE = { ...BASE_RESPONSE, data: { tts: false, flags: [ MessageFlags.Ephemeral ], content: "Here is the link to the bot support server!\n\nhttps://discord.gg/Zy5uXQUZXx" }}
const PING_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { tts: false, flags: [ MessageFlags.Ephemeral ], content: "Pong! As of March 9 2023 I started using an interactions endpoint URI and therefore I am unable to calculate ping times over the gateway. :(" } }
const PRIVACY_RESPONSE = { ...BASE_RESPONSE, data: { tts: false, flags: [ MessageFlags.Ephemeral ], content: "I am a responsible Discord Bot that was built by @ibxcodecat, a developer who values user privacy and security. I only store data that is absolutely necessary for operations regarding the servers I am in and only for the duration that I am in that server. This means that any data that is no longer critical to functionality is promptly deleted.\n\nIt is also important to note that I **CAN NOT** and **WILL NOT** store any message content or profile data. This means user conversations and personal details **CAN NOT** and **WILL NOT** be accessed except in the case of linked roles where you must manually approve profile information to be viewed.\n\nIn addition, I allow users to have control over their data throught the implementation of a **/data** command. With this command, administrators of servers can view and request deletion of data stored by Blue Bot. This gives users peace of mind knowing that they have full control over their data and can manage it as they see fit." }}

// disable body parsing, need the raw body as per https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
export const config = {
  api: {
    bodyParser: false,
  },
}

//THIS IS THE COMMAND HANDLER I THINK
const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<APIInteractionResponse>,
  interaction: APIApplicationCommandInteraction
) => {
  const { data: { name, options }, } = interaction as APIChatInputApplicationCommandInteraction

  switch (name) {
    case "bot-support":
      return res.status(200).json(BOT_SUPPORT_RESPONSE)
    case "help":
<<<<<<< Updated upstream
      return res.status(200).json(BOT_SUPPORT_RESPONSE);
    case "ping":
      return res.status(200).json(PING_COMMAND_RESPONSE)
    case "privacy":
      return res.status(200).json(PRIVACY_RESPONSE);
=======
      return res.status(200).json(COMMAND_SUPPORT_RESPONSE);
    case "translate":
<<<<<<< Updated upstream

      const deferResponse = {
        ...INTERACTION_ACK,
        data:
        {
          ...COMMAND_RESPONSE_DATA
        }
      }

      res.status(200).json(deferResponse);

      const translationResult = await TranslateTextWithDiscordCommandOptions(options!);

      const response = { 
        ...INTERACTION_RESPOND_LATE, 
        data: 
        {
          content: translationResult
        } 
=======
      try
      {
        switch(options![0].name)
        {
          case 'help':
            const response_help = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: 'Help MSG' } }
            return res.status(200).json(response_help);
          case 'message':
            const translation_msg: IBXTranslationObject = await TranslateContent(options!)
            const response_msg = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: '**Here is your translation preview:** ' + translation_msg.translation }}

            //SEND A MESSAGE IN THE EXECUTION CHANNEL HERE!!!

            res.status(200).json(response_msg);
            break;
          case 'preview':
            const translation_preview: IBXTranslationObject = await TranslateContent(options!)
            const response_preview = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: '**Here is your translation preview:** ' + translation_preview.translation }}
            return res.status(200).json(response_preview);
        }
      }
      catch(err)
      {
        console.log(err);
        console.error(err);

        const response = { ...INTERACTION_RESPOND_INSTANTLY, data: { ...COMMAND_RESPONSE_DATA, content: 'There was a problem processing your request\n\n' + err}}
        res.status(200).json(response);
>>>>>>> Stashed changes
      }

      return res.status(200).json(response);
>>>>>>> Stashed changes
    default:
      return res.status(200).json(INVALID_COMMAND_RESPONSE)
  }
}



export default withErrorHandler(withDiscordInteraction(handler))
