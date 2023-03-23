import { $, component$, useOnWindow, useStylesScoped$ } from '@builder.io/qwik';
import type { LeafletEvent } from 'leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import type { BreweryRepository } from '~/domain/Repositories/BreweryRepository';
import { OpenBreweryRepository } from '~/infrastructure/repositories/OpenBreweryRepository';
import styles from './map.css?inline';

export const repository: BreweryRepository = new OpenBreweryRepository();

export let markerLayer: L.Layer;

export const Map = component$(() => {
    useStylesScoped$(styles);

    useOnWindow("load", $(async () => {
        const map = setupMap();

        const seoul = { lat: 37.532600, lng: 127.024612 };

        map.setView(seoul, 12);

        // const breweries = await repository.getNear(seoul.lat, seoul.lng);

        // placeMarkers(map, breweries);

        //map.locate({ setView: true, maxZoom: 11 });
    }));

    return <div id='map'></div>;
});

function setupMap(): L.Map {
    const map = L.map('map', {
        zoomControl: false,
        minZoom: 8,
    });

    L.control.scale().addTo(map);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('moveend', updateMapMarkers);

    return map;
}

function updateMapMarkers(event: LeafletEvent): void {
    const map = event.sourceTarget as L.Map;

    const currentCenter = map.getCenter();

    repository.getNear(currentCenter.lat, currentCenter.lng)
        .then(breweries => {
            const breweriesToMark = breweries.filter(b => b.coordinates)
                .map((b) => L.marker({ lat: b.coordinates!.Value.latitude, lng: b.coordinates!.Value.longitude })
                    .bindTooltip(b.name));

            if (markerLayer !== undefined) {
                map.removeLayer(markerLayer);
            }

            markerLayer = new L.LayerGroup(breweriesToMark);

            map.addLayer(markerLayer);
        });
}
