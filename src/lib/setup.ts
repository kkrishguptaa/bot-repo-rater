import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework'
import { setup } from '@skyra/env-utilities'
import { inspect } from 'util'
import { rootDir } from './constants'

import '@sapphire/plugin-editable-commands/register'
import '@sapphire/plugin-logger/register'
import '@sapphire/plugin-subcommands/register'

import * as colorette from 'colorette'
import * as path from 'path'

process.env.NODE_ENV ??= 'development'

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite)

setup({
  path: path.join(rootDir, '.env')
})

inspect.defaultOptions.depth = 1

colorette.createColors({ useColor: true })

declare module '@skyra/env-utilities' {
  interface Env {
    DISCORD_TOKEN: string
    DISCORD_TEST_GUILDS?: string
  }
}
