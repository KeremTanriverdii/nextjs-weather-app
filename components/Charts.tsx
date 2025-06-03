"use client"

import { useState, useEffect } from "react"
import { Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useWeather } from "@/app/context/WeatherContext"



const chartConfig = {
    windSpeed: {
        label: "Wind Speed (m/s)",
        color: "hsl(var(--chart-1))"
    },
    gust: {
        label: "Gust (m/s)",
        color: "hsl(var(--chart-2))"
    },
} satisfies ChartConfig


export function WindSpeedChart() {
    const { forecast } = useWeather();
    const [chartWindData, setChartWindData] = useState([]);


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
    }, [forecast]);


    return (
        <Card className="w-full h-full  bg-card-style ">
            <CardHeader
                className="flex flex-row items-center justify-between"
            >
                <div>
                    <CardTitle className="md:text-2xl">Wind Speed Analysis</CardTitle>
                    <CardDescription className="text-[13px] md:text-md mt-3 text-white font-bold"
                    >
                        Wind speed and gust measurements over time
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-square"

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
                                tickLine={true}
                                axisLine={false}
                                className="fill-white"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                label={{
                                    value: "Wind Speed (m/s)",
                                    angle: -90,
                                    position: "insideLeft",
                                    style: { textAnchor: "middle", fontSize: 11, },
                                }}
                            />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar
                                dataKey="windSpeed"
                                radius={[4, 4, 0, 0]}
                                barSize={15}
                                name={chartConfig.windSpeed.label}
                                fill="#000"

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
