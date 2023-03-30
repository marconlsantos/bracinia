import { Brewery } from "~/domain/entities/Brewery";
import type { BreweryRepository } from "~/domain/Repositories/BreweryRepository";
import type { QueryResultDto } from "~/domain/Repositories/QueryResultDto";
import { Address } from "~/domain/valueobjects/Address";
import type { BreweryType } from "~/domain/valueobjects/BreweryType";
import { Coordinates } from "~/domain/valueobjects/Coordinates";

interface OpenBreweryDto {
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
  readonly baseUrl: string = "https://api.openbrewerydb.org/breweries";

  async getRandom(): Promise<Brewery> {
    const response = await fetch(new URL(`${this.baseUrl}/random`));
    const data = (await response.json()) as OpenBreweryDto[];

    if (data.length)
      return this.toBrewery(data[0] as unknown as OpenBreweryDto);

    return new Brewery();
  }

  async getNear(latitude: number, longitude: number): Promise<Brewery[]> {
    const response = await fetch(new URL(`${this.baseUrl}?by_dist=${latitude},${longitude}&per_page=200`));
    const data = (await response.json()) as OpenBreweryDto[];

    return data.map(this.toBrewery);
  }

  async get(id: string): Promise<Brewery | undefined> {
    const response = await fetch(new URL(`${this.baseUrl}/${encodeURIComponent(id)}`));

    const data = (await response.json()) as OpenBreweryDto;

    return this.toBrewery(data);
  }

  async query(term: string): Promise<QueryResultDto[]> {
    const response = await fetch(new URL(`${this.baseUrl}/search?query=${encodeURIComponent(term)}`));

    const data = (await response.json()) as QueryResultDto[];

    return data;
  }

  toBrewery(json: OpenBreweryDto): Brewery {
    const result = new Brewery();

    result.id = json.id;
    result.name = json.name;
    result.type = json.brewery_type as unknown as BreweryType;

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
