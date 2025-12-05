import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Mail, ArrowRight } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
        </div>

        <Card className="border-neutral-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Mail className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription className="mt-2">
              We&apos;ve sent you a confirmation link to verify your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-neutral-100 p-4">
              <h4 className="text-sm font-medium text-neutral-900">What happens next?</h4>
              <ol className="mt-2 space-y-2 text-sm text-neutral-600">
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium">
                    1
                  </span>
                  Click the link in your email to verify your account
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium">
                    2
                  </span>
                  Create your first project
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium">
                    3
                  </span>
                  Start collecting feedback
                </li>
              </ol>
            </div>

            <Button asChild className="w-full">
              <Link href="/auth/login">
                Go to Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className="text-center text-xs text-neutral-500">
              Didn&apos;t receive an email?{" "}
              <button className="font-medium text-neutral-900 underline underline-offset-4">Resend</button>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Need help?{" "}
          <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-4">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
