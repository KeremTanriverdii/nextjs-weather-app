"use client"
import { useState } from "react";
import SelectMenu from "./SelectMenu";
import { Card, CardContent } from "./ui/card";
import { ForecastItem, useWeather } from "../app/context/WeatherContext";

export default function Forecast() {
    const { forecast } = useWeather();
    const [selectedForecastType, setSelectedForecastType] = useState('daily');
    if (!forecast || !forecast.list) {
        return <div>Forecast is loading</div>
    }


    function getHourlyForecast(list: ForecastItem[]): ForecastItem[] {
        return list.slice(0, 8)
    }

    function getDailyForecast(list: ForecastItem[]): ForecastItem[] {
        const grouped: Record<string, ForecastItem[]> = {};

        list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(item);
        })

        const daily = Object.values(grouped)
            .slice(0, 8)
            .map(items => {
                const noon = items.find(i => i.dt_txt.includes('12:00:00'));
                return noon || items[Math.floor(items.length / 3)]
            })

        return daily
    }

    const hourlyForecastContent = getHourlyForecast(forecast.list);
    const dailyForecastContent = getDailyForecast(forecast.list)

    const forecastToShow = selectedForecastType === 'hour' ? hourlyForecastContent : dailyForecastContent

    const getDayName = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { weekday: 'long' })
    }

    const getDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', day: 'numeric' })
    }
    return (
        <div className="h-full w-full bg-style-card mb-3">
            <Card className="h-full bg-transparent">
                <div className="flex-between px-3 mb-5">
                    <h2 className="text-2xl">{forecast.city.name} Forecast</h2>
                    <SelectMenu selected={selectedForecastType} onChange={setSelectedForecastType} />
                </div>
                <CardContent className="flex-col-start p-0 md:gap-3 ">
                    {/* This blow is must be add map func to content */}
                    {forecastToShow.map((item: any, index: number) => (
                        <div className="flex items-center justify-between" key={index}>
                            <div className="flex p-1">
                                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" width={30} height={30} />
                                <span>{item.main.temp_max.toFixed(0)}/ <span className="text-gray-600 text-[14px]">{item.main.temp_min.toFixed(0)}</span> </span>
                            </div>
                            <span className="text-sm md:text-md">
                                {selectedForecastType === 'hour'
                                    ? new Date(item.dt_txt).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                    })
                                    : getDate(item.dt_txt)
                                }
                            </span>
                            <span className="text-end w-1/5 text-[14px] md:text-md me-4">{getDayName(item.dt_txt)}</span>
                        </div>
                    ))}

                </CardContent>
            </Card>
        </div>
    )
}
