import { useRouter } from "next/navigation"
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setPage } from "@/store/pageSlice";

export default function BackButton () {
    const dispatch = useDispatch()
    const router = useRouter()
    const handleBack = () => {
      // If user arrived from another page (navigation stack > 2)
      if (typeof window !== "undefined" && window.history.state?.idx > 0) {
        router.back();
      } else {
        dispatch(setPage("home"))
        router.push("/");
      }
    }
    return (
        <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Go back" className="cursor-pointer">
            <ArrowLeft className="size-5" aria-hidden />
        </Button>
    )
}