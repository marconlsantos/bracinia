import type { Address } from "../valueobjects/Address";
import { BreweryType } from "../valueobjects/BreweryType";
import type { Coordinates } from "../valueobjects/Coordinates";

export interface BreweryProps {
    id: string;
    name: string;
    type: BreweryType;
    address: Address | undefined;
    coordinates: Coordinates | undefined;
    phone: string;
    websiteUrl: string;
    updatedAt: Date;
    createdAt: Date;
}

export class Brewery implements BreweryProps {
    id: string = '';
    name: string = '';
    type: BreweryType = BreweryType.closed;
    address: Address | undefined;
    coordinates: Coordinates | undefined;
    phone: string = '';
    websiteUrl: string = '';
    updatedAt: Date = new Date();
    createdAt: Date = new Date();
}
