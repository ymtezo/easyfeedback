"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { MessageSquare, ArrowLeft, Check } from "lucide-react"
import { PRICING_PLANS } from "@/lib/config/pricing"

function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [organizationName, setOrganizationName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get("plan") || "free"

  const plan = PRICING_PLANS[selectedPlan as keyof typeof PRICING_PLANS] || PRICING_PLANS.free

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
          data: {
            organization_name: organizationName,
            plan: selectedPlan,
          },
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col bg-neutral-50">
        <div className="p-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h1 className="mt-4 text-xl font-semibold text-neutral-900">Create your account</h1>
              <p className="mt-1 text-sm text-neutral-600">Start collecting feedback in minutes</p>
            </div>

            <Card className="border-neutral-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Sign Up</CardTitle>
                <CardDescription>Fill in your details to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp}>
                  <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="organization">Organization Name</Label>
                      <Input
                        id="organization"
                        type="text"
                        placeholder="Acme Inc."
                        required
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        className="border-neutral-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-neutral-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="At least 8 characters"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-neutral-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-neutral-200"
                      />
                    </div>
                    {error && (
                      <div className="rounded-md bg-red-50 p-3">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                  <p className="mt-4 text-center text-xs text-neutral-500">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                  </p>
                  <div className="mt-6 text-center text-sm text-neutral-600">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-medium text-neutral-900 underline underline-offset-4">
                      Sign in
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Side - Plan Info */}
      <div className="hidden w-96 flex-col justify-center border-l border-neutral-200 bg-white p-8 lg:flex">
        <div className="rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">{plan.name} Plan</h3>
            {selectedPlan === "pro" && (
              <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white">Popular</span>
            )}
          </div>
          <p className="mt-1 text-sm text-neutral-500">{plan.subtitle}</p>

          <div className="mt-4">
            {plan.price !== null ? (
              <>
                <span className="text-3xl font-bold text-neutral-900">${plan.price}</span>
                <span className="text-neutral-500">/month</span>
              </>
            ) : (
              <span className="text-xl font-semibold text-neutral-900">Custom pricing</span>
            )}
          </div>

          <ul className="mt-6 space-y-3">
            {plan.features.slice(0, 5).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span className="text-sm text-neutral-600">{feature}</span>
              </li>
            ))}
          </ul>

          {selectedPlan !== "free" && (
            <Link
              href="/auth/sign-up"
              className="mt-6 block text-center text-sm text-neutral-500 transition-colors hover:text-neutral-900"
            >
              Switch to Free plan
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SignUpForm />
    </Suspense>
  )
}
