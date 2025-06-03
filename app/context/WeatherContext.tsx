// context/WeatherContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useRef, useEffect, useCallback, useMemo } from 'react';
import Papa from 'papaparse'
export type GeoLocation = { name: string; lat: number; lon: number };


// Define the structure of the weather data
export type WeatherData = {
    name: string;
    main: { temp: number; feels_like: number; humidity: number, uvi: number, temp_min: number, temp_max: number, pressure: number };
    weather: { main: string; description: string; icon: string; }[];
    wind: { speed: number };
    sys: { sunrise: number; sunset: number; country: string; };
    visibility: number;
    timezone: number;
    dt: number;
    clouds: { all: number }
    timezone_offset: number
    coord: { lat: number, lot: number }
    cod: number;
    message?: string;
};

// Define the structure of the forecast data
type WeatherContextType = {
    location: GeoLocation | null;
    weather: WeatherData | null;
    setLocation: (loc: GeoLocation) => void;
    fetchWeatherData: (loc: GeoLocation) => Promise<void>;
    query: string;
    suggestions: GeoLocation[];
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectSuggestion: (loc: GeoLocation) => void;
    forecast: any,
    localDate: string[];
    handleBlur: any;

};

export type ForecastItem = {
    city: {
        name: string;
        country: string;
        coord: { lat: number; lon: number };
    };
    dt: number;
    dt_txt: string;

    list: {
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
            wind: { speed: number; gust: number; }
        };
        weather: { main: string; description: string; icon: string }[];
    }[];
}

type localDate = {
    localDate: Date | null;
    localSunriseTime: Date | null;
    localSunsetTime: Date | null;
    setLocalDate: (date: Date | null) => void;
}
// Create the WeatherContext with a default value of undefined
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
    const [location, _setLocation] = useState<GeoLocation | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [query, setQuery] = useState<string | any>('');
    const [forecast, setForecast] = useState<ForecastItem | null>(null)
    const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
    const [localDate, setLocalDate] = useState<string[]>([])
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const allCitiesRef = useRef<GeoLocation[]>([]);

    // Function to perform search based on the input query
    const performSearch = useCallback((searhQuery: string) => {
        if (!searhQuery || searhQuery.length < 2) {
            setSuggestions([]);
            return
        }
        const lowerQuery = searhQuery.toLowerCase();
        const filteredCities = allCitiesRef.current.filter(city =>
            city.name.toLowerCase().includes(lowerQuery)
        )
        setSuggestions(filteredCities.slice(0, 5))
    }, [])

    // Handle input change and perform searh with a debounce
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            performSearch(val)
        }, 150)

    }, [performSearch])


    // Initialize the Location with a default value
    const initLocation = useCallback(() => {
        const defaultLocation = { name: 'Istanbul', lat: 41.0351, lon: 28.9833 };
        fetchWeatherData(defaultLocation);
    }, []);


    // Fetch weather data for the given Location
    const fetchWeatherData = useCallback(async (loc: GeoLocation) => {
        try {
            _setLocation(loc);

            const [weathersRes, forecastRes] = await Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc.name}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}&units=metric`),
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}&units=metric`)
            ]);
            const weatherData = await weathersRes.json();
            const foreCastData = await forecastRes.json();

            setWeather(weatherData);
            setForecast(foreCastData);


        } catch (err) {
            console.log("get data error during", err);
            setWeather(null);
            setForecast(null);
        }
    }, []);


    const handleSelectSuggestion = useCallback((suggestion: GeoLocation) => {
        setQuery(suggestion.name);
        _setLocation(suggestion);
        setSuggestions([])
        fetchWeatherData(suggestion)
    }, [fetchWeatherData])

    const handleBlur = () => {
        setTimeout(() => {
            setSuggestions([])
        }, 100);
    }

    // CSV files upload and parse
    useEffect(() => {
        const loadCities = async () => {
            try {
                const response = await fetch('/cities_all.csv');
                if (!response.ok) throw new Error(`CSV yüklenemedi: ${response.status}`);

                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    complete: (results) => {
                        const parsedCities: GeoLocation[] = results.data
                            .map((row: any) => {
                                if (row.city_name && typeof row.lat === 'number' && typeof row.lon === 'number') {
                                    return {
                                        name: row.city_name,
                                        lat: row.lat,
                                        lon: row.lon,
                                    };
                                }
                                return null;
                            })
                            .filter(Boolean) as GeoLocation[];

                        allCitiesRef.current = parsedCities;
                    },
                    error: (err: any) => {
                        console.error("CSV parse hatası:", err);
                    }
                });

            } catch (err) {
                console.error("Şehir verisi yüklenirken hata:", err);
            }
        };

        loadCities();
    }, []);

    useEffect(() => {
        initLocation()
    }, [initLocation]);

    // Set the local date based on the weather data
    useEffect(() => {

        if (weather && weather.dt !== undefined && weather.timezone !== undefined && weather.sys &&
            weather.sys.sunrise !== undefined && weather.sys.sunset !== undefined) {
            const localSunriseTime = new Date((weather.sys.sunrise + weather.timezone) * 1000)
                .toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'UTC'
                });
            const localSunsetTime = new Date((weather.sys.sunset + weather.timezone) * 1000)
                .toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'UTC'
                });
            const localDatedt = new Date((weather.dt + weather.timezone) * 1000).toLocaleString('en-US', {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",

            })

            setLocalDate([localDatedt, localSunriseTime, localSunsetTime])
        } else {
            setLocalDate([])
        }
    }, [weather])

    // Context value memoization
    const contextValue = useMemo(() => ({
        location,
        weather,
        query,
        suggestions,
        setLocation: fetchWeatherData,
        handleInputChange,
        handleSelectSuggestion,
        fetchWeatherData,
        forecast,
        localDate,
        handleBlur,
    }), [location, weather, handleBlur,
        localDate, forecast, query, suggestions, handleInputChange, handleSelectSuggestion, fetchWeatherData]
    )

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    );
};

// Custom hook to use the WeatherContext
export const useWeather = () => {
    const ctx = useContext(WeatherContext);
    if (!ctx) throw new Error('useWeather must be inside WeatherProvider');
    return ctx;
};
