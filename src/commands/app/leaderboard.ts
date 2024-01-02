import { ApplyOptions } from '@sapphire/decorators'
import { Subcommand } from '@sapphire/plugin-subcommands'
import { ChatInputCommandInteraction, Message } from 'discord.js'
import * as _ from 'lodash'
import { getLeaderboard } from '../../lib/repo-rater'
import { defaultEmbed, loadingEmbed } from '../../lib/embed'
import { PaginatedMessage } from '@sapphire/discord.js-utilities'

@ApplyOptions<Subcommand.Options>({
  aliases: ['lb', 'top'],
  description: 'Check the Repo Rater leaderboard for various categories.',
  detailedDescription:
    "Find who's on the top of the leaderboard as an popular repository or active user!",
  requiredClientPermissions: ['ViewChannel', 'SendMessages', 'EmbedLinks'],
  requiredUserPermissions: ['ViewChannel', 'SendMessages', 'UseApplicationCommands'],
  subcommands: [
    {
      name: 'voters',
      messageRun: 'voters',
      chatInputRun: 'voters',
      default: true
    }
  ]
})

export class LeaderboardCommand extends Subcommand {
  public override registerApplicationCommands (registry: Subcommand.Registry): void {
    registry.registerChatInputCommand((builder) => builder
      .setName(this.name)
      .setDescription(this.description)
      .addSubcommand((subcommand) => subcommand
        .setName('voters')
        .setDescription('Check the top voters.')
      )
    )
  }

  public async voters (message: Message | ChatInputCommandInteraction): Promise<Message | ChatInputCommandInteraction> {
    let response = message

    if (message instanceof ChatInputCommandInteraction) {
      await message.deferReply()
    } else if (message instanceof Message) {
      response = await message.reply({ embeds: [loadingEmbed(message)] })
    }

    const leaderboard = await getLeaderboard()

    const paginatedMessage = new PaginatedMessage({
      template: {
        embeds: [defaultEmbed(message).setTitle('📊 Repo Rater Leaderboard').setDescription('Here are the top 10 voters:')]
      }
    })

    const chunked = _.chunk(leaderboard, 10)

    chunked.forEach((chunk) => {
      paginatedMessage.addPageEmbed((embed) => {
        embed.addFields(chunk.map((entry, index) => {
          return {
            name: `#${index + 1} ${entry.username}`,
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
