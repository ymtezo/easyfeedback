import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateApiRequest, apiError, apiSuccess } from "@/lib/api/auth"

// POST /api/v1/feedback - Submit feedback
export async function POST(request: NextRequest) {
  // Authenticate
  const auth = await authenticateApiRequest(request)
  if (!auth.success) {
    return apiError(auth.error || "Unauthorized", 401)
  }

  try {
    const body = await request.json()
    const { type, score, comment, respondent_id, metadata, is_anonymous } = body

    // Validate required fields
    if (!type || !["nps", "csat", "ces", "custom"].includes(type)) {
      return apiError("Invalid or missing feedback type. Must be: nps, csat, ces, or custom")
    }

    // Validate score based on type
    if (score !== undefined && score !== null) {
      if (type === "nps" && (score < 0 || score > 10)) {
        return apiError("NPS score must be between 0 and 10")
      }
      if (type === "csat" && (score < 1 || score > 5)) {
        return apiError("CSAT score must be between 1 and 5")
      }
      if (type === "ces" && (score < 1 || score > 7)) {
        return apiError("CES score must be between 1 and 7")
      }
    }

    const supabase = await createClient()

    // Handle respondent
    let respondentId = null
    if (respondent_id && !is_anonymous) {
      // Check if respondent exists
      const { data: existingRespondent } = await supabase
        .from("respondents")
        .select("id")
        .eq("external_id", respondent_id)
        .single()

      if (existingRespondent) {
        respondentId = existingRespondent.id
      } else {
        // Create new respondent
        const { data: newRespondent } = await supabase
          .from("respondents")
          .insert({ external_id: respondent_id, metadata: metadata?.respondent || {} })
          .select("id")
          .single()
        respondentId = newRespondent?.id
      }
    }

    // Create feedback
    const { data: feedback, error } = await supabase
      .from("feedback")
      .insert({
        project_id: auth.projectId,
        respondent_id: respondentId,
        type,
        score,
        comment,
        metadata: metadata?.feedback || {},
        source: "api",
        is_anonymous: is_anonymous || false,
      })
      .select("id, type, score, comment, created_at")
      .single()

    if (error) {
      console.error("Feedback insert error:", error)
      return apiError("Failed to save feedback", 500)
    }

    // Award points to respondent if not anonymous
    if (respondentId) {
      const pointsAwarded = 10 // Base points for feedback

      await supabase.from("point_transactions").insert({
        respondent_id: respondentId,
        amount: pointsAwarded,
        type: "earned",
        description: `Feedback submitted (${type.toUpperCase()})`,
        feedback_id: feedback.id,
      })

      // Update respondent's total points
      await supabase.rpc("increment_respondent_points", {
        respondent_uuid: respondentId,
        points_to_add: pointsAwarded,
      })
    }

    return apiSuccess({ feedback, points_awarded: respondentId ? 10 : 0 }, 201)
  } catch (err) {
    console.error("API Error:", err)
    return apiError("Invalid request body", 400)
  }
}

// GET /api/v1/feedback - List feedback
export async function GET(request: NextRequest) {
  const auth = await authenticateApiRequest(request)
  if (!auth.success) {
    return apiError(auth.error || "Unauthorized", 401)
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const limit = Math.min(Number.parseInt(searchParams.get("limit") || "50"), 100)
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  const supabase = await createClient()

  let query = supabase
    .from("feedback")
    .select("id, type, score, comment, source, is_anonymous, created_at", { count: "exact" })
    .eq("project_id", auth.projectId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (type) {
    query = query.eq("type", type)
  }

  const { data, count, error } = await query

  if (error) {
    return apiError("Failed to fetch feedback", 500)
  }

  return apiSuccess({
    feedback: data,
    pagination: {
      total: count,
      limit,
      offset,
      has_more: (count || 0) > offset + limit,
    },
  })
}
