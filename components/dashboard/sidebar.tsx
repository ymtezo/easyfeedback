"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Key,
  Webhook,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react"
import type { User } from "@supabase/supabase-js"

interface SidebarProps {
  user: User
  organization: {
    id: string
    name: string
    slug: string
    plan: string
  } | null
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
  { href: "/dashboard/webhooks", label: "Webhooks", icon: Webhook },
  { href: "/dashboard/team", label: "Team", icon: Users },
]

const bottomNavItems = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/docs", label: "Documentation", icon: HelpCircle },
]

export function DashboardSidebar({ organization }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r border-neutral-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-neutral-200 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">EasyFeedback</span>
        </Link>
      </div>

      {organization && (
        <div className="border-b border-neutral-200 px-4 py-3">
          <p className="text-sm font-medium text-neutral-900">{organization.name}</p>
          <p className="text-xs text-neutral-500 capitalize">{organization.plan} plan</p>
        </div>
      )}

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-neutral-100 text-neutral-900 font-medium"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-neutral-200 p-4 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-neutral-100 text-neutral-900 font-medium"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
