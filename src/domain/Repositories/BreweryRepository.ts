import type { Brewery } from "../entities/Brewery";

export interface BreweryRepository {
    getRandom(): Promise<Brewery>;
}