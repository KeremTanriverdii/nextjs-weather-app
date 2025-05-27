
import { LabelList, PolarGrid, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { WeatherData } from "@/app/context/WeatherContext"


interface GeneralProps {
    chartProps?: WeatherData
    time: string[]
}

export default function GeneralCharts({ chartProps, time }: GeneralProps) {
    // If chartProps is not provided, return a loading state
    if (!chartProps) {
        return <div>Loading...</div>
    }

    // Prepare the chart data based on the chartPops   
    const chartData = [
        { browser: "tempature", weather: chartProps?.main.temp, fill: "var(--color-tempature)" },
        { browser: "feels_Like", weather: chartProps?.main.feels_like, fill: "var(--color-feels_Like)" },
        { browser: "tempature_Max", weather: chartProps?.main.temp_max, fill: "var(--color-tempature_Max)" },
        { browser: "tempature_Min", weather: chartProps?.main.temp_min, fill: "var(--color-tempature_Min)" },
    ]

    // Add clouds data if avaible and style color
    const chartConfig = {
        weather: {
            label: "weather ©",
        },
        tempature: {
            label: "tempature ℃ ",
            color: "#e38512",
        },
        feels_Like: {
            label: "feels like ℃ ",
            color: "#a9de0b",
        },
        tempature_Max: {
            label: "tempature Max ℃",
            color: "#d92911",
        },
        tempature_Min: {
            label: "tempature Min ℃ ",
            color: "#36afc2",
        },
        clouds: {
            label: "clouds %",
            color: "#1c54ed",
        },
    } satisfies ChartConfig

    return (

        <Card
            className="w-full h-full
            bg-linear-to-r/increasing from-[#192F33] to-[#135065]
         rounded-md bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50">
            <CardHeader
                className="items-center text-white">
                <CardTitle>Weather's Chart </CardTitle>
                <CardDescription
                    className="text-white"
                >
                    {time[0]}
                </CardDescription>
            </CardHeader>


            {/* Chart provided by Shadcn */}
            <ChartContainer
                config={chartConfig}
                className="w-full mx-auto aspect-square"
            >
                <RadialBarChart
                    data={chartData}
                    startAngle={-110}
                    endAngle={220}
                    innerRadius={25}
                    outerRadius={100}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel nameKey="browser" />}
                    />
                    <RadialBar
                        dataKey="weather"
                        background
                    >
                        <LabelList
                            position="insideStart"
                            dataKey="browser"
                            className="fill-white capitalize mix-blend-luminosity"
                            fontSize={11}
                        />
                    </RadialBar>
                    {/* Grid system for chart */}
                    <PolarGrid gridType="circle" />
                </RadialBarChart>
            </ChartContainer>

        </Card>
    )
}
