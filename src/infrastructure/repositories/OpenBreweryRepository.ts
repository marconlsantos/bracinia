import { Brewery } from "~/domain/entities/Brewery";
import type { BreweryRepository } from "~/domain/Repositories/BreweryRepository";
import { Address } from "~/domain/valueobjects/Address";
import { BreweryType } from "~/domain/valueobjects/BreweryType";
import { Coordinates } from "~/domain/valueobjects/Coordinates";

interface OpenBreweryJson {
    id: string;
    name: string;
    brewery_type: string;
    street: string;
    address_2: any;
    address_3: any;
    city: string;
    state: string;
    county_province: any;
    postal_code: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    website_url: string;
    updated_at: string;
    created_at: string;
}


export class OpenBreweryRepository implements BreweryRepository {
    readonly baseUrl: string = "https://api.openbrewerydb.org/breweries/";

    async getRandom(): Promise<Brewery> {
        const response = await fetch(new URL(`${this.baseUrl}random`));
        const data = (await response.json()) as OpenBreweryJson[];

        if (data.length)
            return this.toBrewery(data[0] as unknown as OpenBreweryJson);

        return new Brewery('Unknown', BreweryType.closed);
    }

    toBrewery(json: OpenBreweryJson): Brewery {
        const result = new Brewery(json.name, json.brewery_type as unknown as BreweryType);

        result.id = json.id;

        result.address = new Address({
            street: json.street,
            address_2: json.address_2,
            address_3: json.address_3,
            city: json.city,
            state: json.state,
            county_province: json.county_province,
            postal_code: json.postal_code,
            country: json.country
        });

        const longitude = Number.parseFloat(json.longitude);
        const latitude = Number.parseFloat(json.latitude);
        result.coordinates = new Coordinates({ longitude, latitude });

        result.phone = json.phone;
        result.websiteUrl = json.website_url;
        result.updatedAt = new Date(json.updated_at);
        result.createdAt = new Date(json.created_at);

        return result;
    }
}
