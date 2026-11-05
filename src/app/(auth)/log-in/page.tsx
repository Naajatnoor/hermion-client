"use client";
import { Button } from "../../../components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export default function LoginPage() {

      const handleGoogleSignIn = async ()=>{
            const resData = await authClient.signIn.social({
                provider: 'google'
    
            })
            console.log('after google sign in',resData);
        }
    
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">

      <Card className="w-full max-w-md border shadow-xl">

        <CardHeader className="space-y-2 text-center">

          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#174C3C] text-primary-foreground text-2xl font-bold">
            H
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome Back!
          </CardTitle>

          <CardDescription>
          Login to your Hermione account and continue your journey.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form className="space-y-5">

            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>

              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#174C3C]">
             Login
            </Button>

          </form>

        </CardContent>

        <CardFooter className="flex flex-col gap-5">

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button  onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full gap-2"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3A12 12 0 1 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5Z"
              />
              <path
                fill="#FF3D00"
                d="m6.3 14.7 6.6 4.8A12 12 0 0 1 32 15.1l5.7-5.7A20 20 0 0 0 6.3 14.7Z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.1 0 9.8-1.9 13.3-5.1l-6.2-5.2A12 12 0 0 1 12.8 28l-6.5 5A20 20 0 0 0 24 44Z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.2 5.7l6.2 5.2A20 20 0 0 0 44 24c0-1.2-.1-2.4-.4-3.5Z"
              />
            </svg>

            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          </p>

        </CardFooter>

      </Card>

    </div>
  )
}
