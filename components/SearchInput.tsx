'use client';

import { useState, useRef, useEffect, useCallback } from 'react'; // useEffect ve useCallback eklendi
import { GeoLocation, useWeather } from './WeatherContext';
import { Search } from 'lucide-react';
import Papa from 'papaparse'
// GeoLocation tipinin lat, lon ve name alanlarını içerdiğini varsayıyoruz.
// WeatherContext dosyanızdaki tanımıyla eşleşmeli.
// interface GeoLocation {
//     lat: number;
//     lon: number;
//     name: string;
// }

const fileCitiesPath = "/cities_all.csv"; // public klasörüne taşındı

export default function SearchBar() {

    const { query, suggestions, handleInputChange, handleSelectSuggestion } = useWeather();

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            handleSelectSuggestion(suggestions[0]);
        }
    };

    return (
        <div>
            <input
                type='text'
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Şehir ara..." />
            {suggestions.length > 0 && (
                <ul className='flex flex-col gap-2 bg-white'>
                    {suggestions.map((city, index) => (
                        <li key={index}
                            onClick={() => handleSelectSuggestion(city)}
                            className='z-10 gap-2 hover:bg-slate-500 p-2'
                        >
                            {city.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}