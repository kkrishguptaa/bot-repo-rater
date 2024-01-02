import { Listener } from '@sapphire/framework'
import type { Events, MessageCommandDeniedPayload, UserError } from '@sapphire/framework'
import { type Message } from 'discord.js'

export class UserEvent extends Listener<typeof Events.MessageCommandDenied> {
  public override async run ({ context, message: content }: UserError, { message }: MessageCommandDeniedPayload): Promise<Message | undefined> {
    if (Reflect.get(Object(context), 'silent')) return

    return await message.reply({ content, allowedMentions: { users: [message.author.id], roles: [] } })
  }
}
