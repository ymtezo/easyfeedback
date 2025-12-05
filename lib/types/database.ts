// Database types for EasyFeedback

export type PlanType = "free" | "pro" | "enterprise"
export type MemberRole = "owner" | "admin" | "member"
export type FeedbackType = "nps" | "csat" | "ces" | "custom"
export type PointTransactionType = "earned" | "redeemed" | "expired" | "bonus"

export interface Organization {
  id: string
  name: string
  slug: string
  plan: PlanType
  created_at: string
  updated_at: string
}

export interface OrganizationMember {
  id: string
  organization_id: string
  user_id: string
  role: MemberRole
  created_at: string
}

export interface Project {
  id: string
  organization_id: string
  name: string
  description: string | null
  website_url: string | null
  is_active: boolean
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface ApiKey {
  id: string
  project_id: string
  name: string
  key_hash: string
  key_prefix: string
  permissions: string[]
  last_used_at: string | null
  expires_at: string | null
  created_at: string
}

export interface Webhook {
  id: string
  project_id: string
  url: string
  events: string[]
  secret: string
  is_active: boolean
  created_at: string
}

export interface Respondent {
  id: string
  external_id: string | null
  email_hash: string | null
  metadata: Record<string, unknown>
  total_points: number
  created_at: string
}

export interface Feedback {
  id: string
  project_id: string
  respondent_id: string | null
  type: FeedbackType
  score: number | null
  comment: string | null
  metadata: Record<string, unknown>
  source: string
  is_anonymous: boolean
  created_at: string
}

export interface PointTransaction {
  id: string
  respondent_id: string
  amount: number
  type: PointTransactionType
  description: string | null
  feedback_id: string | null
  created_at: string
}

export interface Badge {
  id: string
  name: string
  description: string | null
  icon: string | null
  requirement_type: string
  requirement_value: number
  points_reward: number
  created_at: string
}

export interface RespondentBadge {
  id: string
  respondent_id: string
  badge_id: string
  earned_at: string
}
