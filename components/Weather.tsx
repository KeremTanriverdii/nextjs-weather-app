"use client"
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useWeather } from "../app/context/WeatherContext";
import SearchBar from "./SearchInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function WeatherCard() {
    // Get the weather data from the context
    const { weather, localDate } = useWeather();
    // If weather or localDate is not avaible, return a loading state
    if (!weather && !localDate) {
        return <div>Loading</div>
    }
    return (
        <Card className="h-full w-full bg-card-style text-white">
            <CardHeader>
                <SearchBar />
            </CardHeader>

            <CardContent className="h-full w-full flex flex-col justify-around border-0 ">
                <div className="w-full flex items-center flex-wrap md:flex-nowrap justify-center md:justify-normal ">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
                                    alt={weather?.weather[0].description}
                                    width={500}
                                    className="sm:w-1/2"
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{weather?.weather[0].description}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <span className="flex-col-center text-4xl  md:text-5xl block z-0 ">
                        {weather?.main.temp.toFixed()}℃
                        <span className="text-sm mt-10 font-bold">
                            {weather?.weather[0].description}
                        </span>
                    </span>
                </div>

                <hr className="mt-6" />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-3">
                <div className="flex gap-3 ">
                    <MapPin />
                    <span>
                        {weather?.name}
                    </span>
                </div>

                <div className="flex gap-3 text-[12px] sm-[text-14px] md:text-[16px] items-center">
                    <Calendar color="#dfc207" />
                    <span className="text-[14px]">
                        {localDate[0]}
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
}
