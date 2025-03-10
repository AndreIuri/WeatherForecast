import { useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "40vh",
};

const zoomLevel = 10;

export function MapTemperature({ cityCoords }: { cityCoords: { lat: number; lng: number } }) {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const googleMapsKey = import.meta.env.VITE_API_KEY_GOOGLE_MAPS;
    const mapRef = useRef<google.maps.Map | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleMapsKey,
    });

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;

        const weatherLayer = new google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
                const layer = "temp_new";
                return `https://tile.openweathermap.org/map/${layer}/${zoom}/${coord.x}/${coord.y}.png?appid=${API_KEY}`;
            },
            tileSize: new google.maps.Size(32, 32),
            opacity: 0.6,
            name: "Weather",
        });

        map.overlayMapTypes.insertAt(0, weatherLayer);
    };

    if (loadError) return <p>Error loading maps</p>;
    if (!isLoaded) return <p>Loading maps...</p>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoomLevel}
            center={cityCoords}
            onLoad={handleMapLoad} 
        />
    );
}

export default MapTemperature;