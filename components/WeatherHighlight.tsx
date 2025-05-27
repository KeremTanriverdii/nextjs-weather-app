"use client"
import { Droplet, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useWeather } from "../app/context/WeatherContext";
import { WindSpeedChart } from "./Charts";
import GeneralCharts from "./GeneralCharts";
import CardWeather from "./CardWeather";
import TimeRanges from "./TimeRanges";

export default function WeatherHighlight() {
    // Get the weather data and local date(string format) from the context
    const { weather, localDate } = useWeather();
    const weatherData = weather
    if (!weather) {
        return <div>Loading</div>
    }

    if (!localDate || !weatherData) {
        return <div>Loading</div>
    }

    return (
        <div className="h-full w-full bg-gradient-to-r from-[##25393B] to-[#fff]">
            <Card className="h-full flex flex-wrap w-full">
                <CardHeader className="md:text-3xl font-bold">Today's Highlight</CardHeader>
                <CardContent className="flex flex-wrap md:flex-nowrap gap-5">
                    {/* This below section going to be add map func*/}

                    <div className="w-full ">
                        <WindSpeedChart />
                    </div>

                    <div className="w-full">
                        <GeneralCharts chartProps={weatherData} time={localDate} />
                    </div>

                    <div className="w-full">
                        <TimeRanges time={localDate} />
                    </div>

                </CardContent>
                <CardFooter className="flex flex-wrap  md:flex-nowrap gap-5">
                    {/*This below section going to be add map func  */}
                    <CardWeather title="Humidity" data={weather.main.humidity} />
                    <CardWeather title="Feels Like" data={weather.main.feels_like} />
                    <CardWeather title="Visibility" data={weather.visibility} />

                </CardFooter>
            </Card>
        </div>
    )
}
