import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateApiRequest, apiError, apiSuccess } from "@/lib/api/auth"

// GET /api/v1/feedback/stats - Get feedback statistics
export async function GET(request: NextRequest) {
  const auth = await authenticateApiRequest(request)
  if (!auth.success) {
    return apiError(auth.error || "Unauthorized", 401)
  }

  const { searchParams } = new URL(request.url)
  const days = Number.parseInt(searchParams.get("days") || "30")
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const supabase = await createClient()

  // Get all feedback for the project within the time range
  const { data: feedback } = await supabase
    .from("feedback")
    .select("type, score, created_at")
    .eq("project_id", auth.projectId)
    .gte("created_at", startDate.toISOString())

  if (!feedback) {
    return apiSuccess({ stats: null, message: "No feedback data available" })
  }

  // Calculate NPS
  const npsFeedback = feedback.filter((f) => f.type === "nps" && f.score !== null)
  let nps = null
  if (npsFeedback.length > 0) {
    const promoters = npsFeedback.filter((f) => f.score! >= 9).length
    const detractors = npsFeedback.filter((f) => f.score! <= 6).length
    nps = Math.round(((promoters - detractors) / npsFeedback.length) * 100)
  }

  // Calculate CSAT
  const csatFeedback = feedback.filter((f) => f.type === "csat" && f.score !== null)
  let csat = null
  if (csatFeedback.length > 0) {
    const satisfied = csatFeedback.filter((f) => f.score! >= 4).length
    csat = Math.round((satisfied / csatFeedback.length) * 100)
  }

  // Calculate CES
  const cesFeedback = feedback.filter((f) => f.type === "ces" && f.score !== null)
  let ces = null
  if (cesFeedback.length > 0) {
    const totalScore = cesFeedback.reduce((sum, f) => sum + (f.score || 0), 0)
    ces = Math.round((totalScore / cesFeedback.length) * 10) / 10
  }

  // Calculate daily trends
  const dailyTrends: Record<string, { nps: number[]; csat: number[]; ces: number[]; total: number }> = {}
  feedback.forEach((f) => {
    const date = f.created_at.split("T")[0]
    if (!dailyTrends[date]) {
      dailyTrends[date] = { nps: [], csat: [], ces: [], total: 0 }
    }
    dailyTrends[date].total++
    if (f.score !== null) {
      if (f.type === "nps") dailyTrends[date].nps.push(f.score)
      if (f.type === "csat") dailyTrends[date].csat.push(f.score)
      if (f.type === "ces") dailyTrends[date].ces.push(f.score)
    }
  })

  return apiSuccess({
    stats: {
      period_days: days,
      total_feedback: feedback.length,
      nps: {
        score: nps,
        responses: npsFeedback.length,
        promoters: npsFeedback.filter((f) => f.score! >= 9).length,
        passives: npsFeedback.filter((f) => f.score! >= 7 && f.score! <= 8).length,
        detractors: npsFeedback.filter((f) => f.score! <= 6).length,
      },
      csat: {
        score: csat,
        responses: csatFeedback.length,
      },
      ces: {
        score: ces,
        responses: cesFeedback.length,
      },
      daily_trends: Object.entries(dailyTrends)
        .map(([date, data]) => ({
          date,
          total: data.total,
        }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    },
  })
}
