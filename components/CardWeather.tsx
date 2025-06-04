import { Droplet, Eye, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import React from "react";


interface Props {
    data: number;
    title: string;
}

export const CardWeather: React.FC<Props> = ({ data, title }) => {
    return (
        <Card className="w-full bg-card-style text-white lg:h-full">
            <CardHeader>{title}</CardHeader>
            <CardContent className="flex items-center justify-between lg:gap-3 lg:p-2">
                <p className="md:text-2xl">
                    {title === "Visibility" ? <span>{data.toFixed(0)} km</span> : ""}
                    {title === "Humidity" ? <span>{data} %</span> : ""}

                </p>
                <div className="flex items-center ">
                    {title === 'Feels Like' ?
                        <span>
                            <Thermometer />
                        </span> : ""}
                    <span >{title === "Feels Like" ? <span className="me-8">{data.toFixed(0)}</span> : ""}</span>
                </div>

                <div className="text-[10px] md:text-[16px] ms-auto">
                    {title === 'Visibility' ?
                        <span>
                            <Eye /> Haze is affecting visibility
                        </span> : ""}
                    {title === 'Humidity' ?
                        <span>
                            <Droplet /> The dew point is 27° right now
                        </span> : ""}
                    {title === 'Feels Like' ?
                        <span>
                            <Eye /> Humidity is making it feel hotter
                        </span> : ""}
                </div>
            </CardContent>
        </Card>
    )
}
