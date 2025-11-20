"use client"

import { useState } from "react"
import { X, ImageIcon, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface ComposeTweetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// ✅ Convert file → Base64 string
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

export default function TippniModal({ open, onOpenChange }: ComposeTweetModalProps) {
  const [tweetText, setTweetText] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isPosting, setIsPosting] = useState(false)
  const { data: session } = useSession()
  console.log('token from Tippni modal', session?.user?.token);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be smaller than 5MB")
      return
    }

    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handlePostTippni = async () => {
    if (!tweetText.trim() && !imageFile) {
      toast.error("Post cannot be empty")
      return
    }

    try {
      setIsPosting(true)
      let base64Images: string[] = []
      if (imageFile) {
        const base64 = await toBase64(imageFile)
        base64Images = [base64]
      }
      const payload = {
        request: {
          text: tweetText.trim(),
        },
        files: base64Images,
      }
      const dummyPayload = {
        request: {
          text: 'dummyTest',
        },
        files: [],
      }
      console.log("📦 Sending Tippni payload:", dummyPayload)
      const res = await fetch("https://api.tippni.com/api/v1/tippni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session?.user?.token
            ? `Bearer ${session.user.token}`
            : "",
        },
        body: JSON.stringify(dummyPayload),
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error("❌ Tippni post failed:", errorText)
        throw new Error(`Request failed: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      console.log("✅ Tippni post success:", data)
      toast.success("Tippni posted successfully!")

 
      setTweetText("")
      setImageFile(null)
      setImagePreview(null)
      onOpenChange(false)
    } catch (error: any) {
      console.error("❌ Tippni post error:", error)
      toast.error(error.message || "Failed to post Tippni.")
    } finally {
      setIsPosting(false)
    }
  }
  // const handlePost = async () => {
  //   console.log('form works');
    
  //   const formData = new FormData();
  //   const jsonBlob = new Blob(
  //     [JSON.stringify({ text: "dazar text 1" })],
  //     { type: "application/json" }
  //   );

  //   formData.append("request", jsonBlob);
  //   const file1 = new File(
  //     [await fetch("/Users/dazar/Downloads/_1.png").then(r => r.blob())],
  //     "photo1.jpg"
  //   );

  //   const file2 = new File(
  //     [await fetch("/Users/dazar/Downloads/_2.png").then(r => r.blob())],
  //     "photo2.png"
  //   );

  //   console.log('images => ',file1, file2);
    
  //   formData.append("files", file1);
  //   formData.append("files", file2);

  //   fetch("https://api.tippni.com/api/v1/tippni", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${session?.user?.token}`
  //     },
  //     body: formData
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log("Response:", data))
  //     .catch(err => console.error("Error:", err));

  // }
  // const handlePost = async () => {
  //   if (!tweetText.trim() && !imageFile) {
  //     toast.error("Post cannot be empty");
  //     return;
  //   }
  
  //   try {
  //     setIsPosting(true);
  //     const formData = new FormData();

  //     const jsonBlob = new Blob(
  //       [JSON.stringify({ text: tweetText.trim() })],
  //       { type: "application/json" }
  //     );
      
  //     formData.append("request", jsonBlob);
  
  //     if (imageFile) {
  //       formData.append("files", imageFile);
  //     }
      
  //     console.log("📤 Posting Tippni FormData:", formData);
  
  //     const res = await fetch("https://api.tippni.com/api/v1/tippni", {
  //       method: "POST",
  //       headers: {
  //         Authorization: session?.user?.token
  //           ? `Bearer ${session.user.token}`
  //           : "",
  //       },
  //       body: formData,
  //     });
  
  //     if (!res.ok) {
  //       const error = await res.text();
  //       console.error("❌ Tippni API Error:", error);
  //       throw new Error(`Tippni failed: ${res.status}`);
  //     }
  
  //     const data = await res.json();
  //     console.log("✅ Tippni posted:", data);
  //     toast.success("Tippni posted successfully!");
  
  //     setTweetText("");
  //     setImageFile(null);
  //     setImagePreview(null);
  //     onOpenChange(false);
  
  //   } catch (err: any) {
  //     console.error("❌ Tippni post error:", err);
  //     toast.error(err?.message || "Failed to post Tippni");
  //   } finally {
  //     setIsPosting(false);
  //   }
  // };
  const handlePost = async () => {
    if (!tweetText.trim() && imageFile) {
      toast.error("Image cannot be posted alone. Add text.");
      return;
    }
  
    if (!tweetText.trim() && !imageFile) {
      toast.error("Post cannot be empty");
      return;
    }
  
    try {
      setIsPosting(true);
      const formData = new FormData();
      const jsonBlob = new Blob(
        [JSON.stringify({ text: tweetText.trim() })],
        { type: "application/json" }
      );
      formData.append("request", jsonBlob);
  
      if (imageFile) {
        formData.append("files", imageFile);
      }
  
      const res = await fetch("https://api.tippni.com/api/v1/tippni", {
        method: "POST",
        headers: {
          Authorization: session?.user?.token
            ? `Bearer ${session.user.token}`
            : "",
        },
        body: formData,
      });
  
      if (!res.ok) {
        const error = await res.text();
        console.error("❌ Tippni API Error:", error);
        throw new Error(`Tippni failed: ${res.status}`);
      }
  
      const data = await res.json();
      console.log("✅ Tippni posted:", data);
      toast.success("Tippni posted successfully!");
  
      setTweetText("");
      setImageFile(null);
      setImagePreview(null);
      onOpenChange(false);
  
    } catch (err: any) {
      console.error("❌ Tippni post error:", err);
      toast.error(err?.message || "Failed to post Tippni");
    } finally {
      setIsPosting(false);
    }
  };
  
  const handleClose = () => {
    setTweetText("")
    setImageFile(null)
    setImagePreview(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border border-border bg-[var(--color-bg)] text-primary p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <button
            onClick={handleClose}
            className="rounded-full hover:bg-secondary/50 p-2 transition"
            aria-label="Close"
          >
            <X className="size-5 text-primary" />
          </button>
          <span className="text-sm font-semibold text-muted-foreground">
            Tippni Post
          </span>
          <div className="w-8" />
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          <div className="flex gap-4">
            <Avatar className="size-12">
              <AvatarImage src="/images/current-user-avatar.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              {/* Text input */}
              <Textarea
                placeholder="What's happening?!"
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                className="resize-none border-0 bg-transparent text-2xl placeholder:text-muted-foreground focus-visible:ring-0 p-0 min-h-24"
              />

              {/* Image preview */}
              {imagePreview && (
                <div className="relative mt-4 rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                  <button
                    onClick={() => {
                      setImagePreview(null)
                      setImageFile(null)
                    }}
                    className="absolute top-2 left-2 rounded-full bg-black/50 p-2 hover:bg-black/70 transition"
                    aria-label="Remove image"
                  >
                    <X className="size-5 text-white" />
                  </button>
                </div>
              )}

              {/* Footer */}
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
                  onClick={handlePost}
                  disabled={isPosting || (!tweetText.trim() && !imageFile)}
                  size="lg"
                  className="rounded-full px-8 font-semibold bg-[var(--color-accent)] text-white hover:opacity-90 transition"
                >
                  {isPosting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
