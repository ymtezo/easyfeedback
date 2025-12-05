import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Get user to create organization after email verification
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const organizationName = user.user_metadata?.organization_name || "My Organization"
        const plan = user.user_metadata?.plan || "free"

        // Create organization for the user
        const slug =
          organizationName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") +
          "-" +
          Date.now().toString(36)

        const { data: org, error: orgError } = await supabase
          .from("organizations")
          .insert({
            name: organizationName,
            slug: slug,
            plan: plan,
          })
          .select()
          .single()

        if (!orgError && org) {
          // Add user as owner of the organization
          await supabase.from("organization_members").insert({
            organization_id: org.id,
            user_id: user.id,
            role: "owner",
          })
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return to error page on failure
  return NextResponse.redirect(`${origin}/auth/error`)
}
