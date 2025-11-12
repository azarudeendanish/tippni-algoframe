// src/components/modals/SignupModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Mail, User, Calendar, UserCircle2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import OtpVerification from "./OtpVerification"
import { apiFetch } from "@/lib/api"
import { api } from "@/lib/axios"

interface SignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenSignin: () => void // ✅ add this
}

export default function SignupModal({ open, onOpenChange, onOpenSignin }: SignupModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showOtp, setShowOtp] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.username.trim()) newErrors.username = "Username is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"
    if (!formData.dob) newErrors.dob = "Date of birth is required"
    if (!formData.gender) newErrors.gender = "Please select your gender"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)

    try {
      const res = await api.post<{ message: string }>("/api/v1/auth/register", formData)
      console.log('res signup modal=>', res.data);
      toast.success(res.data.message || "Signup successful! Verify OTP.")
      setShowOtp(true)
    } catch (err: any) {
      console.error("Signup error:", err)
      const errorMessage = err.response?.data?.message || err.message || "Signup failed. Please try again."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogContent className="max-w border-0 bg-modal text-primary p-6">
        {!showOtp ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-primary">
                Create your account
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSignup} className="space-y-4 mb-6">
              {/* Username */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10 h-11"
                  />
                </div>
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-11"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="pl-10 h-11"
                  />
                </div>
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
              </div>

              {/* Gender */}
              <div>
                <div className="relative">
                  <UserCircle2 className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={cn(
                      "pl-10 pr-4 h-11 w-full rounded-md border border-input bg-background text-sm text-foreground focus:ring-2 focus:ring-ring/50 appearance-none"
                    )}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 h-11"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 h-11"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-muted-foreground">Show password</span>
              </label>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-accent text-white rounded-full font-semibold"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </>
        ) : (
          <OtpVerification
            email={formData.email}
            onVerificationSuccess={() => {
              toast.success("✅ Account verified! Please sign in.")
              setShowOtp(false)
              onOpenChange(false)
              onOpenSignin() // ✅ open signin modal next
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
