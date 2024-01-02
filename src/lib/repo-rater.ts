import * as z from 'zod'

const leaderboardSchema = z.object({
  username: z.string(),
  votes: z.number(),
  stars: z.number()
}).array()

export async function getLeaderboard (): Promise<LeaderboardData> {
  const response = await fetch('https://repo-rater.eddiehub.io/api/leaderboard').then(async res => await res.json())

  const leaderboard = leaderboardSchema.parse(response)

  return leaderboard
}

export type LeaderboardData = z.infer<typeof leaderboardSchema>
