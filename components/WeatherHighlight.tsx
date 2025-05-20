"use client"
import { Droplet, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useWeather } from "./WeatherContext";

export default function WeatherHighlight() {
    const { weather } = useWeather();

    let localSunriseTime: any = null;
    let localSunsetTime: any = null;
    if (weather && weather?.sys.sunrise !== undefined && weather?.sys.sunset !== undefined) {
        localSunriseTime = weather ? new Date((weather.sys.sunrise + weather.timezone) * 1000) : null;
        localSunsetTime = weather ? new Date((weather.sys.sunset + weather.timezone) * 1000) : null;
    }

    return (
        <div className="h-full w-full">
            <Card className="h-full flex flex-wrap w-full">
                <CardHeader className="md:text-3xl font-bold">Today's Highlight</CardHeader>
                <CardContent className="flex flex-wrap md:flex-nowrap gap-5">
                    {/* This below section going to be add map func*/}
                    <Card className="md:w-1/3 w-full h-[270px]  md:h-[350px]">
                        <CardHeader>Wind Status</CardHeader>
                        <CardContent className="">
                            ehg
                        </CardContent>
                        <CardFooter className="flex  justify-between">
                            <span> {weather?.wind.speed} km/h</span>
                            <span>{weather?.timezone}</span>
                        </CardFooter>
                    </Card>
                    <Card className="md:w-1/3 w-full h-[270px]   md:h-[350px]">
                        <CardHeader>UV Index</CardHeader>
                        <CardContent>

                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {weather?.main.uvi} UV
                        </CardFooter>
                    </Card>
                    <Card className="md:w-1/3 w-full h-[270px]  md:h-[350px]">
                        <CardHeader>Sunsrise & Sunset</CardHeader>
                        <CardContent>
                            Chart 3
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="flex flex-col">
                                <div><Sunrise /></div>
                                <span>Sunrise</span>
                                <span>{localSunriseTime?.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>

                            </div>
                            <div className="flex flex-col">
                                <div > <Sunset /></div>
                                <span>Sunset</span>
                                <span>{localSunsetTime?.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>

                            </div>
                        </CardFooter>
                    </Card>

                </CardContent>
                <CardFooter className="flex flex-wrap  md:flex-nowrap gap-5">
                    {/*This below section going to be add map func  */}
                    <Card className="md:w-1/3 w-full">
                        <CardHeader>Humidity</CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <p className="md:text-3xl">{weather?.main.humidity} <span>%</span></p>
                            <div className="flex flex-col text-[12px]">
                                <Droplet />
                                <p>The dew point is 27© <br /> right now</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:w-1/3 w-full ">
                        <CardHeader>Visibility</CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <p className="md:text-3xl">{(weather?.visibility ?? 0) / 1000} <span>km</span></p>

                            <div className="flex flex-col text-[12px]">
                                <Droplet />
                                <p>Haze is affecting<br /> visibility</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:w-1/3 w-full ">
                        <CardHeader>Feels Like</CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <p className="md:text-3xl">{weather?.main.feels_like.toFixed(1)}<span>°</span></p>
                            <div className="flex flex-col text-[12px]">
                                <Droplet />
                                <p>Humidity is making<br /> it feel hotter.</p>
                            </div>
                        </CardContent>
                    </Card>
                </CardFooter>
            </Card>
        </div>
    )
}
