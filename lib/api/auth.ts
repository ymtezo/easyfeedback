import { createClient } from "@/lib/supabase/server"
import type { NextRequest } from "next/server"

export interface ApiAuthResult {
  success: boolean
  projectId?: string
  error?: string
}

export async function authenticateApiRequest(request: NextRequest): Promise<ApiAuthResult> {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { success: false, error: "Missing or invalid Authorization header" }
  }

  const apiKey = authHeader.substring(7) // Remove "Bearer "

  if (!apiKey.startsWith("ef_")) {
    return { success: false, error: "Invalid API key format" }
  }

  // Hash the key to compare with stored hash
  const encoder = new TextEncoder()
  const data = encoder.encode(apiKey)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const keyHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  const supabase = await createClient()

  // Find the API key
  const { data: apiKeyData, error } = await supabase
    .from("api_keys")
    .select("id, project_id, permissions, expires_at")
    .eq("key_hash", keyHash)
    .single()

  if (error || !apiKeyData) {
    return { success: false, error: "Invalid API key" }
  }

  // Check expiration
  if (apiKeyData.expires_at && new Date(apiKeyData.expires_at) < new Date()) {
    return { success: false, error: "API key has expired" }
  }

  // Update last used timestamp
  await supabase.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", apiKeyData.id)

  return { success: true, projectId: apiKeyData.project_id }
}

export function apiError(message: string, status = 400) {
  return Response.json({ error: message, success: false }, { status })
}

export function apiSuccess(data: Record<string, unknown>, status = 200) {
  return Response.json({ ...data, success: true }, { status })
}
