import SelectHours from "./SelectHours";

export default function ConditionMap() {
    return (
        <div className="h-full w-full">
            <div className="flex-between">
                <h2>Weather Condition Map</h2>
                <SelectHours />
            </div>
            <div className="h-full bg-emerald-800 mt-5">
                This section goint to add map Condition
            </div>
        </div>
    )
}
