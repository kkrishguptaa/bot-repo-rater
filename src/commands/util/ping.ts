import { Command } from '@sapphire/framework'
import { ApplicationCommandType, type Message } from 'discord.js'
import { oneLine } from 'common-tags'
import { ApplyOptions } from '@sapphire/decorators'
import { defaultEmbed, loadingEmbed } from '../../lib/embed'
import { colors } from '../../lib/constants'

@ApplyOptions<Command.Options>({
  aliases: ['ping', 'pong', 'tip', 'tap'],
  description: "Checks the bot's ping to the Discord server.",
  detailedDescription:
    "Calculates the bot's ping to the discord server using the websocket connection ping and the time to round trip of editing an message.",
  requiredClientPermissions: ['ViewChannel', 'SendMessages', 'EmbedLinks'],
  requiredUserPermissions: ['ViewChannel', 'SendMessages', 'UseApplicationCommands']
})

export class PingCommand extends Command {
  public override registerApplicationCommands (registry: Command.Registry): void {
    registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description))

    registry.registerContextMenuCommand((builder) => builder.setName('Check Ping').setType(ApplicationCommandType.Message))
  }

  public override async messageRun (message: Message): Promise<Message> {
    const response = await message.reply({
      embeds: [loadingEmbed(message)]
    })

    await response.edit({
      embeds: [
        defaultEmbed(message)
          .setTitle('✅ Pinged')
          .setDescription("Pong! Here's the details:")
          .addFields([
            {
              name: 'Message Round Trip',
              value: oneLine`${response.createdTimestamp - message.createdTimestamp}ms.`,
              inline: true
            },
            { name: 'Hearbeat Ping', value: `${Math.round(this.container.client.ws.ping)}ms.`, inline: true }
          ])
          .setColor(colors.success)
      ]
    })

    return response
  }

  public override async chatInputRun (interaction: Command.ChatInputCommandInteraction): Promise<Message> {
    await interaction.deferReply()

    return await interaction.followUp({
      embeds: [
        defaultEmbed(interaction)
          .setTitle('✅ Pinged')
          .setDescription("Pong! Here's the details:")
          .addFields([
            {
              name: 'Message Round Trip',
              value: oneLine`${Date.now() - interaction.createdTimestamp}ms.`,
              inline: true
            },
            { name: 'Hearbeat Ping', value: `${Math.round(this.container.client.ws.ping)}ms.`, inline: true }
          ])
          .setColor(colors.success)
      ],
      ephemeral: true
    })
  }

  public override async contextMenuRun (interaction: Command.ContextMenuCommandInteraction): Promise<Message> {
    await interaction.deferReply()

    return await interaction.followUp({
      embeds: [
        defaultEmbed(interaction)
          .setTitle('✅ Pinged')
          .setDescription("Pong! Here's the details:")
          .addFields([
            {
              name: 'Message Round Trip',
              value: oneLine`${Date.now() - interaction.createdTimestamp}ms.`,
              inline: true
            },
            { name: 'Hearbeat Ping', value: `${Math.round(this.container.client.ws.ping)}ms.`, inline: true }
          ])
          .setColor(colors.success)
      ],
      ephemeral: true
    })
  }
}
