import {
  IConfigurationExtend, IEnvironmentRead, ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';

import { DogeCommand } from './commands/DogeCommand';

export class DogeApp extends App {
  constructor(info: IAppInfo, logger: ILogger) {
    super(info, logger);
  }

  protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
    await configuration.settings.provideSetting({
      id: 'doge_name',
      type: SettingType.STRING,
      packageValue: 'doge',
      required: true,
      public: false,
      i18nLabel: 'Customize_Name',
      i18nDescription: 'Customize_Name_Description',
    });

    await configuration.settings.provideSetting({
      id: 'doge_icon',
      type: SettingType.STRING,
      packageValue: 'https://raw.githubusercontent.com/tgardner851/Rocket.Chat.App-doge/master/icon.jpg',
      required: true,
      public: false,
      i18nLabel: 'Customize_Icon',
      i18nDescription: 'Customize_Icon_Description',
    });

    await configuration.slashCommands.provideSlashCommand(new DogeCommand());
  }
}
