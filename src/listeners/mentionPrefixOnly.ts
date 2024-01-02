import type { Events } from '@sapphire/framework'
import { Listener } from '@sapphire/framework'
import { send } from '@sapphire/plugin-editable-commands'
import type { Message } from 'discord.js'

export class UserEvent extends Listener<typeof Events.MentionPrefixOnly> {
  public async run (message: Message): Promise<Message<boolean>> {
    const prefix = await this.container.client.options.fetchPrefix?.(message) ?? this.container.client.options.defaultPrefix

    if (!prefix) return await send(message, `There is no prefix for this guild. Use @${this.container.client.user?.username} to run commands.`)

    return await send(message, `The prefix for this guild is \`${prefix.toString()}\``)
  }
}
