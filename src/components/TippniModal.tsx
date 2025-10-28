"use client"

import type React from "react"
import { useState } from "react"
import { X, ImageIcon, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface ComposeTweetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TippniModal({ open, onOpenChange }: ComposeTweetModalProps) {
  const [tweetText, setTweetText] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleTweet = () => {
    if (tweetText.trim()) {
      console.log("[v0] Tippni posted:", tweetText)
      setTweetText("")
      setImagePreview(null)
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    setTweetText("")
    setImagePreview(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl border border-border bg-[var(--color-bg)] text-primary p-0 transition-colors duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <button
            onClick={handleClose}
            className="rounded-full hover:bg-secondary/50 p-2 transition"
            aria-label="Close"
          >
            <X className="size-5 text-primary" />
          </button>
          <span className="text-sm font-semibold text-muted-foreground">Tippni Post</span>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <div className="flex gap-4">
            <Avatar className="size-12">
              <AvatarImage src="/images/current-user-avatar.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              {/* Input */}
              <Textarea
                placeholder="What's happening?!"
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                className="resize-none border-0 bg-transparent text-2xl placeholder:text-muted-foreground focus-visible:ring-0 p-0 min-h-24"
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative mt-4 rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 left-2 rounded-full bg-black/50 p-2 hover:bg-black/70 transition"
                    aria-label="Remove image"
                  >
                    <X className="size-5 text-white" />
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div className="flex gap-2">
                  <label className="cursor-pointer rounded-full hover:bg-accent/10 p-2 transition">
                    <ImageIcon className="size-5 text-[var(--color-accent)]" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      aria-label="Upload image"
                    />
                  </label>
                  <button className="rounded-full hover:bg-accent/10 p-2 transition">
                    <Heart className="size-5 text-[var(--color-accent)]" />
                  </button>
                </div>

                <Button
                  onClick={handleTweet}
                  disabled={!tweetText.trim()}
                  size="lg"
                  className="rounded-full px-8 font-semibold bg-[var(--color-accent)] text-white hover:opacity-90 transition"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
