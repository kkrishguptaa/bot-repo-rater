import './lib/setup'
import { LogLevel, SapphireClient, container } from '@sapphire/framework'
import { gray } from 'colorette'
import { GatewayIntentBits } from 'discord.js'
import { isDev } from './lib/constants'

const client = new SapphireClient({
  defaultPrefix: '!',
  caseInsensitiveCommands: true,
  logger: {
    level: isDev ? LogLevel.Debug : LogLevel.Info
  },
  intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  loadMessageCommandListeners: true
})

const main = async (): Promise<void> => {
  try {
    await client.login()
  } catch (error: any) {
    throw new Error(`${gray('[CLIENT]')} ${error}`)
  }
}

main().catch((err) => {
  container.logger.fatal(err)
  process.exit(1)
})
