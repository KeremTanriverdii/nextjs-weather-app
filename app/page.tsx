import Forecast from "@/components/Forecast";
import WeatherCard from "@/components/Weather";
import { WeatherProvider } from "@/app/context/WeatherContext";
import WeatherHighlight from "@/components/WeatherHighlight";
import MapComponent from "@/components/MapComponent";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 content-center gap-5 md:gap-3 px-1 mt-10">
      <WeatherProvider>
        <WeatherCard />
        <div className="md:col-span-2">
          <WeatherHighlight />
        </div>
        <Forecast />
        <div className="md:col-span-2">
          <MapComponent />
        </div>
      </WeatherProvider>
    </div>
  );
}
