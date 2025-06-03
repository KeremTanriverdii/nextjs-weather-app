'use client';

import { useWeather } from '../app/context/WeatherContext';
import { SearchIcon } from 'lucide-react';
import React, { KeyboardEvent } from 'react';
export default function SearchBar() {
    // Get the WeatherContext states
    const { query, suggestions, handleInputChange, handleSelectSuggestion, handleBlur } = useWeather();

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            handleSelectSuggestion(suggestions[0]);
        }
    };

    return (
        <div className='relative w-full'>
            <input
                type='text'
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder={`Search City`}
                className='border border-gray-400 rounded-md  p-3 w-full'
            />
            <div className='absolute inset-y-3 right-0 pr-3 pointer-events-none'>
                <SearchIcon />
            </div>
            {suggestions.length > 0 && (
                <div className='absolute z-30 w-full mt-1 max-h-[200px]'>
                    <ul className='flex flex-col gap-2 bg-slate-400/10'>
                        {suggestions.map((city, index) => (
                            <li key={index}
                                onClick={() => handleSelectSuggestion(city)}
                                className='gap-2 hover:bg-slate-500 p-2 rounded-md'
                            >
                                {city.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}