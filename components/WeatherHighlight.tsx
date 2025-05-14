import { Droplet, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function WeatherHighlight() {
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
                            <span> 7.90 km/h</span>
                            <span>5:01 AM</span>
                        </CardFooter>
                    </Card>
                    <Card className="md:w-1/3 w-full h-[270px]   md:h-[350px]">
                        <CardHeader>UV Index</CardHeader>
                        <CardContent>
                            Chart 2
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <span> 7.90 km/h</span>
                            <span>5:01 AM</span>
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
                                <span>5:50 AM</span>
                            </div>
                            <div className="flex flex-col">
                                <div > <Sunset /></div>
                                <span>Sunset</span>
                                <span>6:30 PM</span>
                            </div>
                        </CardFooter>
                    </Card>

                </CardContent>
                <CardFooter className="flex flex-wrap  md:flex-nowrap gap-5">
                    {/*This below section going to be add map func  */}
                    <Card className="md:w-1/3 w-full">
                        <CardHeader>Humidity</CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <p className="md:text-3xl">84 <span>%</span></p>
                            <div className="flex flex-col text-[12px]">
                                <Droplet />
                                <p>The dew point is 27© <br /> right now</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:w-1/3 w-full ">
                        <CardHeader>Visibility</CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <p className="md:text-3xl">03 <span>km</span></p>
                            <div className="flex flex-col text-[12px]">
                                <Droplet />
                                <p>Haze is affecting<br /> visibility</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:w-1/3 w-full ">
                        <CardHeader>Humidity</CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <p className="md:text-3xl">42<span>°</span></p>
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
