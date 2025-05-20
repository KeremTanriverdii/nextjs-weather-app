"use client"
import { Calendar, LocateIcon, MapPin, Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useWeather, WeatherData } from "./WeatherContext";
import SearchBar from "./SearchInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function WeatherCard() {
    const { weather } = useWeather();
    console.log(weather)
    const utcSecondsdt = (weather?.dt ?? 0) + (weather?.timezone ?? 0)
    let localDatedt: Date | null = null;

    if (weather && weather.dt !== undefined && weather.timezone !== undefined) {
        localDatedt = new Date((weather.dt + weather.timezone) * 1000);
    }

    return (
        <div className="h-full">
            <Card className="relative h-full ">
                <CardHeader>
                    <span className="absolute top-5 right-5p-2 rounded-full">
                        <SearchBar />
                        {/* <Search className="text-white" /> */}
                    </span>
                </CardHeader>

                <CardContent className="h-full flex flex-col  justify-center border-0">
                    <div className="w-full">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
                                        alt={weather?.weather[0].description}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{weather?.weather[0].description}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex-col-start gap-5">
                        <span className="text-7xl block ">
                            {weather?.main.temp.toFixed()}
                            ©</span>
                        <div className="flex gap-5 items-center">
                            <span>
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                                    alt={weather?.weather[0].description}
                                />
                            </span>
                            {weather?.weather[0].description}
                        </div>
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

                    <div className="flex gap-3">
                        <Calendar color="#dfc207" />

                        {localDatedt?.toDateString()} - {localDatedt?.toLocaleDateString('tr-TR', { hour: '2-digit' })}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
