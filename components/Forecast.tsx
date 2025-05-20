import SelectMenu from "./SelectMenu";
import { Card, CardContent } from "./ui/card";
import { Select } from "./ui/select";

export default function Forecast() {
    return (
        <div className="h-full w-full">
            <div className="flex-between mb-5">
                <h2>7 days Forecast</h2>
                <SelectMenu />
            </div>
            <Card className="h-full">
                <CardContent className="flex-col-start gap-3">
                    {/* This blow is must be add map func to content */}
                    <div className="flex-between">
                        <div className="flex">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKGUJFIqbqA0iZK_9Hk71nv-YQ0OVi38jG3A&s" alt="" width={30} height={30} />
                            <span>+29°/ <span className="text-gray-600 text-[14px]">18</span> </span>
                        </div>
                        <span>Calendar</span>
                        <span>Day</span>
                    </div>
                    <div className="flex-between">
                        <div className="flex">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKGUJFIqbqA0iZK_9Hk71nv-YQ0OVi38jG3A&s" alt="" width={30} height={30} />
                            <span>+29°/ <span className="text-gray-600 text-[14px]">18</span> </span>
                        </div>
                        <span>Calendar</span>
                        <span>Day</span>
                    </div>
                    <div className="flex-between">
                        <div className="flex">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKGUJFIqbqA0iZK_9Hk71nv-YQ0OVi38jG3A&s" alt="" width={30} height={30} />
                            <span>+29°/ <span className="text-gray-600 text-[14px]">18</span> </span>
                        </div>
                        <span>Calendar</span>
                        <span>Day</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
