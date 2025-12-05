import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateApiRequest, apiError, apiSuccess } from "@/lib/api/auth"

// GET /api/v1/respondents/:id - Get respondent details
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authenticateApiRequest(request)
  if (!auth.success) {
    return apiError(auth.error || "Unauthorized", 401)
  }

  const { id } = await params
  const supabase = await createClient()

  // Get respondent by external_id
  const { data: respondent } = await supabase
    .from("respondents")
    .select("id, external_id, total_points, created_at")
    .eq("external_id", id)
    .single()

  if (!respondent) {
    return apiError("Respondent not found", 404)
  }

  // Get respondent's feedback for this project
  const { data: feedback, count } = await supabase
    .from("feedback")
    .select("id, type, score, created_at", { count: "exact" })
    .eq("respondent_id", respondent.id)
    .eq("project_id", auth.projectId)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get respondent's badges
  const { data: badges } = await supabase
    .from("respondent_badges")
    .select("earned_at, badges(name, description, icon)")
    .eq("respondent_id", respondent.id)

  return apiSuccess({
    respondent: {
      id: respondent.external_id,
      total_points: respondent.total_points,
      feedback_count: count,
      recent_feedback: feedback,
      badges: badges?.map((b) => ({
        ...(b.badges as { name: string; description: string; icon: string }),
        earned_at: b.earned_at,
      })),
      member_since: respondent.created_at,
    },
  })
}
