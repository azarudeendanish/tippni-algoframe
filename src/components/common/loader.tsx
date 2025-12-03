import * as React from "react"

import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"
import Logo from "../../../public/images/tippniLogo.png";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
}

function Loader({ className, width = 70, height = 70 }: LoaderProps) {
  return (
    <>
        {/* <LoaderCircle className={cn("animate-spin text-accent hidden", className)} />
        <Image src={Logo} alt='loading image' width={100} height={100} /> */}
        <div className="relative flex items-center justify-center">
          <LoaderCircle
            className={cn(
              "absolute animate-spin text-accent w-30 h-30",
              className
            )}
          />

          {/* Centered logo inside spinner */}
          <Image
            src={Logo}
            alt="Loading logo"
            width={typeof width === "string" ? undefined : width}
            height={typeof height === "string" ? undefined : height}
            className="rounded-full object-contain"
            priority
          />
        </div>
    </>
  )
}

export { Loader }
