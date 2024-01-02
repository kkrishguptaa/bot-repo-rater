import type { Events, MessageCommandSuccessPayload } from '@sapphire/framework'
import { Listener, LogLevel } from '@sapphire/framework'
import type { Logger } from '@sapphire/plugin-logger'
import { getAuthorInfo, getCommandInfo, getGuildInfo } from '../../../lib/utils'
import { gray } from 'colorette'

export class UserEvent extends Listener<typeof Events.MessageCommandSuccess> {
  public override run ({ command, message }: MessageCommandSuccessPayload): void {
    this.container.logger.info(`${gray('[COMMAND]')} ${getAuthorInfo(message.author)}'s command ${getCommandInfo(command)} succeeded in ${getGuildInfo(message.guild)}`)
  }

  public override onLoad (): unknown {
    this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug
    return super.onLoad()
  }
}
