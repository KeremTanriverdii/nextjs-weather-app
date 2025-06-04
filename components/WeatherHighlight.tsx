"use client"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useWeather } from "../app/context/WeatherContext";
import { WindSpeedChart } from "./Charts";
import GeneralCharts from "./GeneralCharts";
import { CardWeather } from "./CardWeather";

export default function WeatherHighlight() {
    // Get the weather data and local date(string format) from the context
    const { weather, localDate } = useWeather();
    const weatherData = weather
    // If not loading weather api get loading state
    if (!weather) {
        return <div>Loading</div>
    }

    if (!localDate || !weatherData) {
        return <div>Loading</div>
    }

    return (
        <Card className="w-full md:flex flex-wrap bg-card-style h-full">
            <CardHeader className="md:text-3xl font-bold">Today&apos; Highlight</CardHeader>

            <CardContent className="flex flex-col md:flex-row w-full justify-stretch gap-5">
                <div className="md:w-1/2 h-[40vh]">
                    <WindSpeedChart />
                </div>

                <div className="md:w-1/2 h-[40vh]">
                    <GeneralCharts chartProps={weatherData} time={localDate} />
                </div>
            </CardContent>

            <CardFooter className="flex flex-wrap  lg:flex-nowrap gap-2 ">
                {/*This below section going to be add map func  */}
                <CardWeather title="Humidity" data={weather.main.humidity} />
                <CardWeather title="Feels Like" data={weather.main.feels_like} />
                <CardWeather title="Visibility" data={weather.visibility} />
            </CardFooter>
        </Card>
    )
}
