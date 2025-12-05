import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { authenticateApiRequest, apiError, apiSuccess } from "@/lib/api/auth"

// GET /api/v1/respondents/:id/points - Get point history
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authenticateApiRequest(request)
  if (!auth.success) {
    return apiError(auth.error || "Unauthorized", 401)
  }

  const { id } = await params
  const supabase = await createClient()

  // Get respondent
  const { data: respondent } = await supabase
    .from("respondents")
    .select("id, total_points")
    .eq("external_id", id)
    .single()

  if (!respondent) {
    return apiError("Respondent not found", 404)
  }

  // Get point transactions
  const { data: transactions } = await supabase
    .from("point_transactions")
    .select("amount, type, description, created_at")
    .eq("respondent_id", respondent.id)
    .order("created_at", { ascending: false })
    .limit(50)

  return apiSuccess({
    balance: respondent.total_points,
    transactions: transactions || [],
  })
}
