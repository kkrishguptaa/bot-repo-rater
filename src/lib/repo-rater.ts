import * as z from 'zod'

const leaderboardSchema = z.object({
  username: z.string(),
  votes: z.number().finite(),
  stars: z.number().finite()
}).array()

export async function getLeaderboard (): Promise<LeaderboardData> {
  const response = await fetch('https://repo-rater.eddiehub.io/api/leaderboard').then(async res => await res.json())

  const leaderboard = leaderboardSchema.parse(response)

  return leaderboard
}

export type LeaderboardData = z.infer<typeof leaderboardSchema>

const popularSchema = z.object({
  url: z.string().url(),
  logo: z.string().url(),
  description: z.string(),
  rating: z.number().finite(),
  votes: z.number().finite(),
  owner: z.string(),
  name: z.string(),
  badgeViews: z.number().finite()
}).array()

export async function getPopular (): Promise<PopularData> {
  const response = await fetch('https://repo-rater.eddiehub.io/api/popular').then(async res => await res.json())

  const popular = popularSchema.parse(response)

  return popular
}

export type PopularData = z.infer<typeof popularSchema>
