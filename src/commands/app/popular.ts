import { ApplyOptions } from '@sapphire/decorators'
import { ChatInputCommandInteraction, Message } from 'discord.js'
import * as _ from 'lodash'
import { defaultEmbed, loadingEmbed } from '../../lib/embed'
import { PaginatedMessage } from '@sapphire/discord.js-utilities'
import { Command } from '@sapphire/framework'
import repoRater from 'repo-rater.js'

@ApplyOptions<Command.Options>({
  description: 'Find the most popular repositories on RepoRater 📈',
  detailedDescription:
    "List of the most popular repositories on RepoRater, based on the number of votes they've received.",
  requiredClientPermissions: ['ViewChannel', 'SendMessages', 'EmbedLinks'],
  requiredUserPermissions: ['ViewChannel', 'SendMessages', 'UseApplicationCommands']
})

export class PopularCommand extends Command {
  public override registerApplicationCommands (registry: Command.Registry): void {
    registry.registerChatInputCommand((builder) => builder
      .setName(this.name)
      .setDescription(this.description)
    )
  }

  public override async messageRun (message: Message): Promise<Message> {
    return await this.popular(message)
  }

  public override async chatInputRun (interaction: ChatInputCommandInteraction): Promise<ChatInputCommandInteraction> {
    return await this.popular(interaction)
  }

  private async popular<T extends Message | ChatInputCommandInteraction> (message: T): Promise<T> {
    let response: T = message

    if (message instanceof ChatInputCommandInteraction) {
      await message.deferReply()
    } else if (message instanceof Message) {
      response = await message.reply({ embeds: [loadingEmbed(message)] }) as T
    }

    const popular = await repoRater('GET /popular', undefined, undefined)

    const paginatedMessage = new PaginatedMessage({
      template: {
        embeds: [defaultEmbed(message).setTitle('📈 Popular on RepoRater').setDescription('Here are the top 10 popular repositories on RepoRater:')]
      }
    })

    const chunked = _.chunk([...popular], 10)

    chunked.forEach((chunk) => {
      paginatedMessage.addPageEmbed((embed) => {
        embed.addFields(chunk.map((entry, index) => {
          return {
            name: `#${index + 1} ${entry.owner}/${entry.name}`,
            value: `${entry.votes} votes`
          }
        }))

        return embed
      })
    })

    await paginatedMessage.run(response)

    return response
  }
}
