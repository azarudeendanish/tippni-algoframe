"use client"

import { useState } from "react"
import SettingsContent from "./SettingsContent"
import SettingsHeader from "./SettingsHeader"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("account")
    return (
        <main className="col-span-12 lg:col-span-6">
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SettingsHeader />
            </div>
            <SettingsContent activeTab={activeTab} onTabChange={setActiveTab} />
        </main>
    )
}