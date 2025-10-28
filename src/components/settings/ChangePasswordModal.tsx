"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import ForgotPasswordModal from "./ForgotPasswordModal"

interface ChangePasswordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ChangePasswordModal({
  open,
  onOpenChange,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  const validatePassword = (password: string) => {
    const errors = []
    if (password.length < 8 || password.length > 16)
      errors.push("Password must be 8–16 characters")
    if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter")
    if (!/[0-9]/.test(password)) errors.push("At least one number")
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
      errors.push("At least one symbol (!@#$%^&*)")
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!currentPassword) return setError("Current password is required")
    if (!newPassword) return setError("New password is required")

    const passwordErrors = validatePassword(newPassword)
    if (passwordErrors.length > 0) {
      setError(`New password must have: ${passwordErrors.join(", ")}`)
      return
    }

    if (newPassword !== confirmPassword)
      return setError("Passwords do not match")

    if (newPassword === currentPassword)
      return setError("New password must be different from the old one")

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        onOpenChange(false)
        setSuccess(false)
      }, 1500)
    } catch {
      setError("Failed to change password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const passwordValidationRules = validatePassword(newPassword)
  const isNewPasswordValid = newPassword && passwordValidationRules.length === 0

  return (
    <>
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out" />
            <DialogContent className="sm:max-w-md border-0 bg-modal text-foreground shadow-xl transition-colors">
                <DialogHeader className="pb-4">
                <DialogTitle className="text-xl font-semibold text-foreground">
                    Change Password
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                    Update your password to keep your account secure.
                </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current Password */}
                <div className="space-y-2">
                    <label
                    htmlFor="current-password"
                    className="text-sm font-medium text-foreground"
                    >
                    Current Password
                    </label>
                    <div className="relative">
                    <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="pr-10 bg-background border-border"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showCurrentPassword ? (
                        <EyeOff className="size-4" />
                        ) : (
                        <Eye className="size-4" />
                        )}
                    </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => setForgotPasswordOpen(true)}
                        className="text-xs text-primary hover:underline cursor-pointer"
                    >
                        Forgot password?
                    </button>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label
                    htmlFor="new-password"
                    className="text-sm font-medium text-foreground"
                    >
                    New Password
                    </label>
                    <div className="relative">
                    <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pr-10 bg-background border-border"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showNewPassword ? (
                        <EyeOff className="size-4" />
                        ) : (
                        <Eye className="size-4" />
                        )}
                    </button>
                    </div>

                    {newPassword && (
                    <div className="mt-3 space-y-2 text-sm">
                        <p className="font-medium text-muted-foreground">
                        Password requirements:
                        </p>
                        <div className="space-y-1">
                        {[
                            {
                            rule: newPassword.length >= 8 && newPassword.length <= 16,
                            text: "8–16 characters",
                            },
                            { rule: /[A-Z]/.test(newPassword), text: "One uppercase letter" },
                            { rule: /[0-9]/.test(newPassword), text: "One number" },
                            {
                            rule: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword),
                            text: "One symbol (!@#$%^&*)",
                            },
                        ].map((item, i) => (
                            <div
                            key={i}
                            className={`flex items-center gap-2 ${
                                item.rule
                                ? "text-accent dark:text-accent"
                                : "text-muted-foreground"
                            }`}
                            >
                            {item.rule ? (
                                <CheckCircle className="size-4" />
                            ) : (
                                <AlertCircle className="size-4" />
                            )}
                            <span>{item.text}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium text-foreground"
                    >
                    Confirm Password
                    </label>
                    <div className="relative">
                    <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pr-10 bg-background border-border"
                    />
                    <button
                        type="button"
                        onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                        ) : (
                        <Eye className="size-4" />
                        )}
                    </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
                    <AlertCircle className="size-4 text-red-600 dark:text-red-400" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
                    <CheckCircle className="size-4 text-green-600 dark:text-green-400" />
                    <p className="text-sm text-green-600 dark:text-green-400">
                        Password changed successfully!
                    </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="flex-1 border-border text-muted-foreground hover:bg-secondary"
                    disabled={isLoading}
                    >
                    Cancel
                    </Button>
                    <Button
                    type="submit"
                    className="flex-1 bg-accent hover:bg-accent/90 text-white"
                    disabled={
                        isLoading ||
                        !currentPassword ||
                        !isNewPasswordValid ||
                        !confirmPassword
                    }
                    >
                    {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                </div>
                </form>
            </DialogContent>
        </Dialog>
        <ForgotPasswordModal open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen} />
    </>
  )
}
