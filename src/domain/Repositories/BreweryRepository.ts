import type { Brewery } from "../entities/Brewery";

/**
 * Defines brewery repository behavior.
 */
export interface BreweryRepository {
    /**
     * Get a random brewery from the data source.
     */
    getRandom(): Promise<Brewery>;

    /**
     * Returns the closest breweries to the [latitude] and [longitude] provided.
     */
    getNear(latitude: number, longitude: number): Promise<Brewery[]>;

    /**
     * Returns the brewery that matches the id provided, if one exists.
     */
    get(id: string): Promise<Brewery | undefined>;
}