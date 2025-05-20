import dynamic from "next/dynamic";
import SelectHours from "./SelectHours";
import MapComponent from "./MapComponent";

// const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false })

export default function ConditionMap() {
    return (
        <div className="h-full w-full">
            <div className="flex-between">
                <h2>Weather Condition Map</h2>
                <SelectHours />
            </div>
            <div className="h-full mt-5">
                <MapComponent />
            </div>
        </div>
    )
}
