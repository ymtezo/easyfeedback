import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl">Authentication Error</CardTitle>
            <CardDescription className="mt-2">
              Something went wrong during authentication. This could be due to an expired or invalid link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/auth/login">Try signing in again</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/sign-up">Create a new account</Link>
              </Button>
            </div>

            <p className="text-center text-xs text-neutral-500">
              If this problem persists,{" "}
              <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-4">
                contact support
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
