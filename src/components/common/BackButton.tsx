import { useRouter } from "next/navigation"
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setPage } from "@/store/pageSlice";

export default function BackButton () {
    const dispatch = useDispatch()
    const router = useRouter()
    // i'm using http://localhost:3000/ as home and not using router, 
    // it switches the component when needed when i other menu's in leftsidebar 
    // and use the follows component when click back and again, it completely 
    // go to chrome home screen because of no history to avoid this give me 
    // solution my home screen is http://localhost:3000/ with components as (HomePage.tsx)
    const handleBack = () => {
      if (document.referrer.includes(window.location.host)) {
        router.back();
      } else {
        router.push("http://localhost:3000/");
      }
    };
    return (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBack} 
          // onClick={()=> router.back()} 
          aria-label="Go back" 
          className="cursor-pointer"
        >
            <ArrowLeft className="size-5" aria-hidden />
        </Button>
    )
}