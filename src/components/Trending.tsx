import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react";

export default function Trending() {
    const names = ["DevTalk", "CodeLife", "News", "MovieTalk", "NowTrending"];
    const trending = names.slice(0, 5).map((name, i) => {
        // const shortName = name.length > 9 ? name.slice(0, 9) + ".." : name;
        return {
          title: `${i + 1}. #${name}`,
          titleFull: `#${name}`,
          tweets: `${((i + 3) * 1.2).toFixed(1)}K Tippni's`,
        };
      });
      
    return(
        <>
            <Card className="border-none gap-1 bg-secondary">
                <div className="px-4 py-1 flex justify-between text-accent">
                    <div className="flex gap-2">
                        <h3 className="text-sm font-semibold truncate">Trending</h3>
                        <TrendingUp />
                    </div>
                    <div className="text-xs">Today</div>
                </div>
                <ul className="">
                {trending.map((t, i) => (
                    <li key={i} className="px-4 py-3 flex justify-between gap-3">
                        <div className="relative group inline-block min-w-0">
                            <div className="text-sm font-medium cursor-pointer truncate">{t.title}</div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                                        hidden group-hover:block bg-gray-800 text-white text-sm 
                                        rounded py-1 px-2 whitespace-nowrap shadow-lg">
                                {t.titleFull}
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{t.tweets}</div>
                    </li>
                ))}
                </ul>
                <div className="px-4 py-1 flex justify-end">
                    <button className="text-md cursor-pointer text-accent font-bold hover:underline" aria-label="Show more trending">
                        Show more
                    </button>
                </div>
            </Card>
        </>
    )
}