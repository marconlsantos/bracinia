import { expect, test } from 'vitest';
import { OpenBreweryRepository } from './OpenBreweryRepository';

test(`[OpenBreweryRepository] should get random brewery`, async () => {
    let repository = new OpenBreweryRepository();

    var result = await repository.getRandom();

    expect(result).not.toBeUndefined();
});
