import { Droplet } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";


export default function CardWeather({ data, title }: any) {
    return (
        <Card className="md:w-1/3 w-full">
            <CardHeader>{title}</CardHeader>
            <CardContent className="flex items-center justify-between">
                <p className="md:text-3xl">{data}
                    <span>{title === "Visibility" ? "km" : ""}</span>
                    <span>{title === "Humidity" ? "%" : ""}</span>
                    <span className="font-bold">{title === "Feels Like" ? "°" : ""}</span>
                </p>

                <div className="flex flex-col text-[12px]">
                    <Droplet />
                    <p>The dew point is 27© <br /> right now</p>
                </div>
            </CardContent>
        </Card>
    )
}
