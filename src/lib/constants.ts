import type { ColorResolvable } from 'discord.js'

import * as path from 'path'

export const rootDir = path.join(__dirname, '..', '..')
export const srcDir = path.join(rootDir, 'src')
export const isDev = Boolean(process.env.NODE_ENV !== 'production')

export const RandomLoadingMessage = ['Computing...', 'Thinking...', 'Cooking some food', 'Give me a moment', 'Loading...']

export const colors: Record<string, ColorResolvable> = {
  eddiehub: '#D15C2C',
  error: '#ED4245',
  loading: '#FEE75C',
  success: '#57F287'
}
