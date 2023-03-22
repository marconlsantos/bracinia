import { $, component$, useOnWindow, useStylesScoped$ } from '@builder.io/qwik';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import type { BreweryRepository } from '~/domain/Repositories/BreweryRepository';
import { OpenBreweryRepository } from '~/infrastructure/repositories/OpenBreweryRepository';
import styles from './map.css?inline';

export const repository: BreweryRepository = new OpenBreweryRepository();

export const Map = component$(() => {
    useStylesScoped$(styles);

    useOnWindow("load", $(async () => {
        console.log('LOADED!!');

        const random = await repository.getRandom();

        const lat = random.coordinates === undefined ? 0 : random.coordinates.Value.latitude;
        const lng = random.coordinates === undefined ? 0 : random.coordinates.Value.longitude;

        console.log(random);

        const map = L.map('map', {
            zoomControl: false,
        }).setView({ lat, lng }, 12);

        L.control.scale().addTo(map);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker({ lat, lng }).addTo(map);

    }));

    return <div id='map'></div>;
});
