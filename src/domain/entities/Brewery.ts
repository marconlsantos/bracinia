import type { Address } from "../valueobjects/Address";
import type { BreweryType } from "../valueobjects/BreweryType";
import type { Coordinates } from "../valueobjects/Coordinates";

export class Brewery {
    id: string = '';
    name: string = '';
    type: BreweryType;
    address: Address | undefined;
    coordinates: Coordinates | undefined;
    phone: string = '';
    websiteUrl: string = '';
    updatedAt: Date = new Date();
    createdAt: Date = new Date();

    constructor(name: string, type: BreweryType) {
        this.name = name;
        this.type = type;
    }
}
