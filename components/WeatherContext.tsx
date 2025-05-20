// context/WeatherContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useRef, useEffect, useCallback, useMemo } from 'react';
import Papa from 'papaparse'
export type GeoLocation = { name: string; lat: number; lon: number };

export type WeatherData = {
    name: string;
    main: { temp: number; feels_like: number; humidity: number, uvi: number };
    weather: { main: string; description: string; icon: string; }[];
    wind: { speed: number };
    sys: { sunrise: number; sunset: number; country: string; };
    visibility: number;
    timezone: number;
    dt: number;
    timezone_offset: number

    // ... ihtiyaca göre genişlet
};

type WeatherContextType = {
    location: GeoLocation | null;
    weather: WeatherData | null;
    setLocation: (loc: GeoLocation) => void;
    fetchWeatherData: (loc: GeoLocation) => void;
    query: string;
    suggestions: GeoLocation[];
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectSuggestion: (loc: GeoLocation) => void;
    forecast: any
};

export type ForecastItem = {
    dt: string;
    dt_txt: string;
    city: { name: string; }
    list: {
        dt_txt: string;
        main: { temp_max: number; temp_min: number; }
        weather: { description: string; icon: string; main: string; }[]
    }
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
    const [location, _setLocation] = useState<GeoLocation | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [query, setQuery] = useState<string | any>('');
    const [forecast, setForecast] = useState<ForecastItem | any>(null)
    const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const allCitiesRef = useRef<GeoLocation[]>([]);


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



    const initLocation = useCallback(() => {
        const defaultLocation = { name: 'Istanbul', lat: 41.0082, lon: 28.9784 };
        fetchWeatherData(defaultLocation);
    }, [])

    const fetchWeatherData = useCallback(async (loc: GeoLocation) => {

        _setLocation(loc);
        // Yeni lokasyon geldi, weather fetch et

        const [weathersRes, forecastRes] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc.name}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}&units=metric`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API}&units=metric`)
        ]);
        const weatherData = await weathersRes.json();
        const foreCastData = await forecastRes.json();

        setWeather(weatherData);
        setForecast(foreCastData);
    }, []);

    const handleSelectSuggestion = useCallback((suggestion: GeoLocation) => {
        setQuery(suggestion.name);
        _setLocation(suggestion);
        setSuggestions([])
        fetchWeatherData(suggestion)
    }, [fetchWeatherData])

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
    }, [initLocation])

    const contextValue = useMemo(() => ({
        location,
        weather,
        query,
        suggestions,
        setLocation: fetchWeatherData,
        handleInputChange,
        handleSelectSuggestion,
        fetchWeatherData,
        forecast
    }), [location, weather, forecast, query, suggestions, handleInputChange, handleSelectSuggestion, fetchWeatherData]
    )

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const ctx = useContext(WeatherContext);
    if (!ctx) throw new Error('useWeather must be inside WeatherProvider');
    return ctx;
};
