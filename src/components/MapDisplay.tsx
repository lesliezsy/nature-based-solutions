import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

const center: [number, number] = [-120.41675, 37.35852];
const zoom = 15.19; 


export const MapDisplay = () => {

    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: center,
        zoom: zoom
      });
    }


    return () => {
      mapRef.current?.remove()
    }
  }, [])


  return (
    <div className="" id="map-page">
      <div id='map-container' ref={mapContainerRef}/>
    </div>
  );
};