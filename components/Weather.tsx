import { Calendar, LocateIcon, Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function WeatherCard() {
    return (
        <div className="h-full">
            <Card className="relative h-full ">
                <CardHeader>
                    <span className="absolute top-5 right-5 bg-black p-2 rounded-full">
                        <Search className="text-white" />
                    </span>
                </CardHeader>

                <CardContent className="h-full flex flex-col  justify-center border-0">
                    <div className="w-full">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKGUJFIqbqA0iZK_9Hk71nv-YQ0OVi38jG3A&s" alt="" />
                    </div>
                    <div className="flex-col-start gap-5">
                        <span className="text-7xl block ">28©</span>
                        <div className="flex gap-5 ">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPBNmC-WCiL5oRCLlZwyj0tjbwTQhdSH9CQ&s" width={45} height={45} alt="" />
                            <span>Rainy storms Clouds</span>
                        </div>
                    </div>
                    <hr className="mt-6" />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-3">
                    <div className="flex gap-3 ">
                        <LocateIcon />
                        <span>Florida, US</span>
                    </div>

                    <div className="flex gap-3">
                        <Calendar />
                        <span>24 July,2025 05:01 AM</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
