import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SettingsHeader() {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <Link href="/" className="hover:bg-secondary rounded-full p-2 transition">
        <ArrowLeft className="size-5" aria-hidden />
      </Link>
      <div>
        <h2 className="text-xl font-bold">Settings and privacy</h2>
        <p className="text-sm text-muted-foreground">Manage your account settings</p>
      </div>
    </div>
  )
}
