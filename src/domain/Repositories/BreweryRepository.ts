import type { Brewery } from "../entities/Brewery";
import type { QueryResultDto } from "./QueryResultDto";

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
   * @param id The brewery id.
   */
  get(id: string): Promise<Brewery | undefined>;

  /**
   * Get a list of locations where breweries are available
   * @param partialMatch The match to check against country and city values.
   */
  query(term: string): Promise<QueryResultDto[]>;
}
