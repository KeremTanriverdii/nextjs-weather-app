'use client';

import Map, { Marker, NavigationControl, ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { useWeather } from './WeatherContext';
import type { MapRef } from 'react-map-gl/mapbox-legacy';
const MapComponent = () => {

    const { location } = useWeather();
    const mapRef = useRef<MapRef>(null);
    const [viewState, setViewState] = useState<ViewState>({
        longitude: location?.lon ?? 28.9784,
        latitude: location?.lat ?? 41.0082,
        zoom: 10,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    useEffect(() => {
        if (location && mapRef.current) {
            mapRef.current.flyTo({
                center: [location.lon, location.lat],
                zoom: 10,
                duration: 1000
            })
        }
    }, [location])


    console.log(location)
    return (
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
            <Map
                ref={mapRef}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <NavigationControl position="top-left" />
                <Marker longitude={location?.lon ?? 28.9784} latitude={location?.lat ?? 41.0082} anchor="bottom">
                    <div className="text-xl">📍</div>
                </Marker>
            </Map>
        </div>
    );
};

export default MapComponent;
