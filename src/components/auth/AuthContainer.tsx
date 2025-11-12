// /src/components/auth/AuthContainer.tsx
"use client"

import { useSession, signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import SignupPage from "./SignupPage"
import SigninModal from "../modals/SigninModal"
import { toast } from "sonner"
import OtpVerification from "../modals/OtpVerification"
import { api } from "@/lib/axios"

export default function AuthContainer() {
  const { data: session, status } = useSession()
  const [showSignup, setShowSignup] = useState(true)
  const [showSignin, setShowSignin] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  // --- Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // do nothing — HomePage will show from parent
    }
  }, [status, session])

  // --- OAuth signup
  const handleOAuthSignup = async (provider: "google" | "apple") => {
    toast.loading(`Redirecting to ${provider}...`)
    await signIn(provider)
  }

  // --- Email signup
  const handleEmailSignup = async (formData: any) => {
    try {
      const res = await api.post("/api/v1/auth/register", formData)
      toast.success("Signup successful! Please verify your OTP.")
      setUserEmail(formData.email)
      setShowOtp(true)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed.")
    }
  }

  // --- OTP verification success
  const handleOtpVerifySuccess = () => {
    toast.success("✅ Account verified! Please sign in.")
    setShowOtp(false)
    setShowSignup(false)
    setShowSignin(true) // ✅ open SigninModal next
  }

  if (status === "loading") return <div>Loading...</div>

  if (session?.user) return null // HomePage shown by parent

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* OTP Verification */}
      {showOtp ? (
        <OtpVerification email={userEmail} onVerificationSuccess={handleOtpVerifySuccess} />
      ) : showSignup ? (
        <SignupPage
          onSignupGoogle={() => handleOAuthSignup("google")}
          onSignupApple={() => handleOAuthSignup("apple")}
          onSwitchToSignin={() => {
            setShowSignup(false)
            setShowSignin(true)
          }}
        />
      ) : (
        <SigninModal
          open={showSignin}
          onOpenChange={setShowSignin}
          openSignup={showSignup}
          onOpenChangeSignup={setShowSignup}
          onSignup={showSignup}
          onSetSignup={setShowSignup}
        />
      )}
    </div>
  )
}
