import { container } from '@sapphire/framework'
import { pickRandom } from '@sapphire/utilities'
import { EmbedBuilder } from 'discord.js'
import type { ChatInputCommandInteraction, ContextMenuCommandInteraction, Message } from 'discord.js'
import { RandomLoadingMessage, colors } from './constants'

export function defaultEmbed (message: Message | ChatInputCommandInteraction | ContextMenuCommandInteraction): EmbedBuilder {
  const client = container.client
  const member = message.member

  return new EmbedBuilder().setAuthor({
    name: client?.user?.displayName ?? '',
    iconURL: client?.user?.displayAvatarURL() ?? undefined
  }).setFooter({
    text: member?.user.username ?? ''
  }).setColor(colors.eddiehub)
}

export function loadingEmbed (message: Message | ChatInputCommandInteraction | ContextMenuCommandInteraction): EmbedBuilder {
  return defaultEmbed(message)
    .setTitle('⏳ Loading')
    .setDescription(pickRandom(RandomLoadingMessage))
    .setColor(colors.loading)
}

export function errorEmbed (message: Message | ChatInputCommandInteraction | ContextMenuCommandInteraction): EmbedBuilder {
  return defaultEmbed(message)
    .setTitle('🔴 Error')
    .setDescription('An error occurred.')
    .setColor(colors.error)
}
