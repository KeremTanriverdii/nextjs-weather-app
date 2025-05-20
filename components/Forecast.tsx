"use client"
import SelectMenu from "./SelectMenu";
import { Card, CardContent } from "./ui/card";
import { Select } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useWeather } from "./WeatherContext";

export default function Forecast() {
    const { forecast } = useWeather();
    console.log(forecast)

    // const dailyForecast = forecast.list.filter(item:any => item.dt_)
    if (!forecast) return <div>Forecast yükleniyor...</div>;

    const filteredForecastData = forecast.list.filter((item: any) =>
        item.dt_txt.includes("12:00:00")
    )

    return (
        <div className="h-full w-full">
            <div className="flex-between mb-5">
                <h2>7 days Forecast</h2>
                <SelectMenu />
            </div>
            <Card className="h-full">
                <CardContent className="flex-col-start gap-3">
                    {/* This blow is must be add map func to content */}
                    {filteredForecastData.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between">
                            <div className="flex items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                alt={item.weather[0].description}
                                                className="mx-auto"
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item?.weather[0].description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <span><span className="font-bold">+{item.main.temp_max}</span>/{item.main.temp_min}</span>
                                <span className="text-blue-100">{item.dt_txt}</span>
                            </div>
                        </div>
                    ))}

                </CardContent>
            </Card>
        </div>
    )
}
