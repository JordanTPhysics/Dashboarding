"use client";

import React, { useState, useRef, useEffect } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import { Place } from "../../components/places/places";

const containerStyle = {
    width: '75vw',
    height: '60vh',
    borderRadius: '3%',
    border: 'solid 10px #3535c1cc',
};

type DashMapProps = {
    data: Place[],
    lat: number,
    lon: number
}

function DashMap({ data, lat, lon }: DashMapProps) {

    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.GOOGLE_PLACES_API!,
                version: 'weekly',
            });

            const { Map } = await loader.importLibrary('maps');

            const mapOptions: google.maps.MapOptions = {
                center: { lat: lat, lng: lon },
                zoom: 8
            };

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        }
        initMap();
    }, [lat, lon]);

    return (
        
            <div className='' ref={mapRef} style={containerStyle}></div>
        
    )
}

export default DashMap;