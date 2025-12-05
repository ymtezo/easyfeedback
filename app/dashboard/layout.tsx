import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user's organization
  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id, role, organizations(*)")
    .eq("user_id", user.id)
    .single()

  const organization = membership?.organizations as {
    id: string
    name: string
    slug: string
    plan: string
  } | null

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <DashboardSidebar user={user} organization={organization} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader user={user} organization={organization} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
