import ConditionMap from "@/components/ConditionMap";
import Forecast from "@/components/Forecast";
import WeatherCard from "@/components/Weather";
import WeatherHighlight from "@/components/WeatherHighlight";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 px-5 h-[40vh] mt-10">
      <WeatherCard />
      <div className="md:col-span-2">
        <WeatherHighlight />
      </div>
      <Forecast />
      <div className="md:col-span-2">
        <ConditionMap />
      </div>
    </div>
  );
}
