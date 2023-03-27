import { $, component$, useOnWindow, useStylesScoped$ } from '@builder.io/qwik';
import type { LeafletEvent } from 'leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import type { Brewery } from '~/domain/entities/Brewery';
import type { BreweryRepository } from '~/domain/Repositories/BreweryRepository';
import type { Address } from '~/domain/valueobjects/Address';
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

    return <div id='map' />;
});

function setInitialPosition() {
    // try so set map to user location
    map.locate({ setView: true, maxZoom: 12 });

    try {
        // will throw error if user does not allow location
        map.getCenter();
    } catch (e) {
        // Greenwich observatory
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
                .map((b) => {
                    const marker = L.marker({ lat: b.coordinates!.Value.latitude, lng: b.coordinates!.Value.longitude });
                    marker.bindTooltip(b.name);
                    marker.on('mouseup', showBreweryPopup, { marker: marker, breweryId: b.id });

                    return marker;
                });

            if (markerLayer !== undefined) {
                map.removeLayer(markerLayer);
            }

            markerLayer = new L.LayerGroup(breweriesToMark);

            map.addLayer(markerLayer);
        });
}

function showBreweryPopup(): void {
    repository.get(this.breweryId)
        .then(brewery => {
            if (brewery) {
                this.marker
                    .bindPopup(buildBreweryPopup(brewery))
                    .openPopup();
            }
        });
}

function buildBreweryPopup(brewery: Brewery): string {
    return `<div>
  <div class="px-4 py-5 sm:px-6">
    <h3 class="text-base font-semibold leading-6 text-gray-900">${brewery.name}</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">${brewery.type}</p>
  </div>
  <div>
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6">
        ${buildAddressHtml(brewery.address)}
      </div>
      <div class="bg-white px-4 py-5 sm:gap-4 sm:px-6">
        ${brewery.phone}
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6">
        <a href="${brewery.websiteUrl}" target="_blank"'>Visit website</a>
      </div>
    </dl>
  </div>
</div>
`;
}


function buildAddressHtml(address: Address | undefined) {
    if (!address) return;

    let html = address.Value.street;
    if (address.Value.address_2) html += '</br>' + address.Value.address_2;
    if (address.Value.address_3) html += '</br>' + address.Value.address_3;
    html += '</br>' + address.Value.city + ' ' + address.Value.postal_code;
    if (address.Value.county_province) html += '</br>' + address.Value.county_province;
    if (address.Value.state) html += '</br>' + address.Value.state;
    if (address.Value.country) html += '</br>' + address.Value.country;

    return html;
}
