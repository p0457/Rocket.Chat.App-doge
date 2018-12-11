import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class DogeCommand implements ISlashCommand {
    public command: string = 'doge';
    public i18nParamsExample: string = 'Slash_Command_Params_Example';
    public i18nDescription: string = 'Slash_Command_Description';
    public providesPreview: boolean = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const icon = await read.getEnvironmentReader().getSettings().getValueById('doge_icon');
        const username = await read.getEnvironmentReader().getSettings().getValueById('doge_name');

        let successful = true;
        let response = '';

        if (context.getArguments().length !== 0) {
          // Now check for appropriate split
          const args = context.getArguments().slice().join(' ');
          const urlPart = args.replace(/[.!?,]/g, '/').replace(/[ ]/g, '');
          if (urlPart.indexOf('/') > -1) {
            successful = true;
            response = 'http://dogr.io/' + urlPart + '.png';
          } else { // Not enough text pieces
            successful = false;
            response = 'Must provide at least two texts. Separate with `,`';
          }
        } else { // If arguments length is 0, no text to place
          successful = false;
          response = 'Must provide text to make a Doge meme!';
        }

        const builder = modify.getCreator().startMessage()
          .setSender(context.getSender()).setRoom(context.getRoom())
          .setText(response).setUsernameAlias(username).setAvatarUrl(icon);

        if (successful === true) {
          // Respond in room
          await modify.getCreator().finish(builder);
        } else {
          // Respond back to user directly
          await modify.getNotifier().notifyUser(context.getSender(), builder.getMessage());
        }

        return;
    }
}
