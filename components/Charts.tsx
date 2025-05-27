"use client"

import { useState, useEffect } from "react"
import { Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useWeather } from "@/app/context/WeatherContext"



const chartConfig = {
    windSpeed: {
        label: "Wind Speed (m/s)",
        color: "#fff"
    },
    gust: {
        label: "Gust (m/s)",
        color: "#F59E0B"
    },
} satisfies ChartConfig


export function WindSpeedChart() {
    const { forecast } = useWeather();
    const [chartWindData, setChartWindData] = useState([]);
    console.log(forecast)
    useEffect(() => {
        if (forecast && forecast.list) {
            const processData = forecast.list.slice(0, 8).map((item: any) => ({
                time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                windSpeed: parseFloat(item.wind.speed.toFixed(1)),
                gust: item.wind.gust ? parseFloat(item.wind.gust.toFixed(1)) : parseFloat(item.wind.speed.toFixed(1)),
            }));
            setChartWindData(processData);
        } else {
            setChartWindData([])
        }
    }, [forecast])

    return (
        <Card className="w-full h-full bg-linear-to-r/increasing  from-[#192F33] to-[#142428]  rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50">
            <CardHeader
                className="flex flex-row items-center justify-between text-white
            ">
                <div>
                    <CardTitle>Wind Speed Analysis</CardTitle>
                    <CardDescription
                        className="text-white"
                    >
                        Wind speed and gust measurements over time
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="">
                <ChartContainer
                    config={chartConfig}

                >
                    <ResponsiveContainer
                        width="100%"
                        height="100%"

                    >
                        <ComposedChart
                            data={chartWindData}
                        >
                            <CartesianGrid
                                strokeDasharray="1 1"
                                opacity={0.3}
                            />

                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={5}

                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                label={{
                                    value: "Wind Speed (m/s)",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { textAnchor: "middle", fill: "#fff", fontSize: 11 },
                                }}
                            />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar
                                dataKey="windSpeed"
                                radius={[4, 4, 0, 0]}
                                barSize={15}
                                name={chartConfig.windSpeed.label}
                            />
                            <Line
                                type="monotone"
                                dataKey="gust"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name={chartConfig.gust.label}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
