import { $, component$, useOnWindow, useStylesScoped$ } from '@builder.io/qwik';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import styles from './braciniamap.css?inline';

export const BraciniaMap = component$(() => {
    useStylesScoped$(styles);

    useOnWindow("load", $(() => {
        console.log('LOADED!!');

        // center of the USA
        const startLocation = { longitude: - 98.5795, latitude: 39.828175 };

        // if (global.navigator) {
        //     global.navigator.geolocation.getCurrentPosition((local) => {
        //         startLocation.latitude = local.coords.latitude;
        //         startLocation.longitude = local.coords.longitude;
        //     });
        // }

        const map = L.map('map', {
            scrollWheelZoom: false
        }).setView({ lng: startLocation.longitude, lat: startLocation.latitude }, 13);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    }));


    return <div id='map'></div>;
});
