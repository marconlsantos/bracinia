import { $, component$, useOnWindow, useStylesScoped$ } from '@builder.io/qwik';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import styles from './map.css?inline';

export const Map = component$(() => {
    useStylesScoped$(styles);

    useOnWindow("load", $(() => {
        console.log('LOADED!!');

        const map = L.map('map', {
            scrollWheelZoom: false
        });

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    }));


    return <div id='map'></div>;
});