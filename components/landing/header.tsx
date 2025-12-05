import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">EasyFeedback</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900">
            How it Works
          </Link>
          <Link href="#pricing" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm text-neutral-600 transition-colors hover:text-neutral-900">
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
