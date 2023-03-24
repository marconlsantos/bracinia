import { $, component$, useOnWindow, useStylesScoped$ } from '@builder.io/qwik';
import type { LeafletEvent } from 'leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import type { BreweryRepository } from '~/domain/Repositories/BreweryRepository';
import { OpenBreweryRepository } from '~/infrastructure/repositories/OpenBreweryRepository';
import styles from './map.css?inline';

// because Qwik will split these into different files, wee need to export them
export const repository: BreweryRepository = new OpenBreweryRepository();

export let map: L.Map;
export let markerLayer: L.Layer;

export const Map = component$(() => {
    useStylesScoped$(styles);

    useOnWindow("load", $(async () => {
        setupMap();

        setInitialPosition();
    }));

    return <div id='map'></div>;
});

function setInitialPosition() {
    // try so set map to user location
    map.locate({ setView: true, maxZoom: 12 });

    try {
        // will throw error if user does not allow location
        map.getCenter();
    } catch (e) {
        map.setView({ lat: 51.47813730092184, lng: -0.000030705541477539806 }, 12);
    }
}

function setupMap(): void {
    map = L.map('map', {
        zoomControl: false,
        minZoom: 8,
    });

    L.control.scale().addTo(map);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('moveend', updateMapMarkers);
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
