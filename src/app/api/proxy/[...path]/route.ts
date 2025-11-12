// src/app/api/proxy/[...path]/route.ts
import { NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.tippni.com"

export async function requestHandler(req: Request, { params }: { params: { path: string[] } }) {
  const url = `${API_BASE_URL}/${params.path.join("/")}`

  const body = req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined

  const res = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": req.headers.get("content-type") || "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body,
  })

  const text = await res.text()

  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
    },
  })
}

export const GET = requestHandler
export const POST = requestHandler
export const PUT = requestHandler
export const PATCH = requestHandler
export const DELETE = requestHandler
