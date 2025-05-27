import { Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import SunIcon from "./ui/SunIcon";

export default function TimeRanges({ time }: { time: string[] }) {
    // Create a time range for sunrise and sunset
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const dayProgress = Math.max(0, Math.min(1, (nowMinutes - +time[1])
        / (+time[2] - +time[1])));

    // radius, centerX,centerY,angle
    const radius = 90;
    const centerX = 100;
    const centerY = 100;

    // Calculate the position of the sun based on the day progress
    const angle = Math.PI * dayProgress;
    const sunX = centerX + radius * Math.cos(Math.PI - angle);
    const sunY = centerY - radius * Math.sin(Math.PI - angle);

    // If day prograss pass 0.5 return sunset icon, else return sunrise icon
    const sunIcon = dayProgress > 0.5 ? (
        <Sunset size={36} color="#faab00" strokeWidth={1.75} />
    ) : (
        <Sunrise size={36} color="#faab00" strokeWidth={1.75} />
    )

    return (
        <Card className="w-full h-full
        bg-linear-to-r/increasing from-[#192F33] to-[#135065]
         rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50
        ">
            <CardHeader>Sunsrise & Sunset</CardHeader>
            <CardContent className="flex-col-center w-full">
                <svg width='200' height='150' className="relative">
                    <path
                        d="M10 100 A90 90 0 0 1 190 100"
                        stroke="#444"
                        strokeWidth="4"
                        fill="transparent"
                    />
                    <path
                        d="M10 100 A90 90 0 0 1 190 100"
                        stroke="#FFD700"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray="282.74"
                        strokeDashoffset={282.74 * (1 - dayProgress)}
                    />
                    <circle cx={sunX} cy={sunY} r="6" fill="yellow" />
                </svg>

                <div className="absolute top-0 left-0">
                    {sunIcon}
                </div>

            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex flex-col">
                    <div>
                        <Sunrise size={36} color="#faab00" strokeWidth={1.75} />
                    </div>
                    <span className="text-[#faab00]" >Sunrise</span>
                    <span className="text-white">{time[1]}</span>

                </div>
                <div className="flex flex-col">
                    <div>
                        <Sunset size={36} color="#faab00" strokeWidth={1.75}
                        />
                    </div>
                    <span className="text-[#faab00]">Sunset</span>
                    <span className="text-white">{time[2]}</span>

                </div>
            </CardFooter>
        </Card>
    )
}
