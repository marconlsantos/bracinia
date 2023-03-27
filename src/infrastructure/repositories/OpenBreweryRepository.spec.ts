import { expect, test } from 'vitest';
import { OpenBreweryRepository } from './OpenBreweryRepository';

test(`[OpenBreweryRepository] should get random brewery`, async () => {
    let repository = new OpenBreweryRepository();

    var result = await repository.getRandom();

    expect(result).not.toBeUndefined();
});

test(`[OpenBreweryRepository] should get nearest breweries`, async () => {
    let repository = new OpenBreweryRepository();

    // coordinates for center of Seoul
    var result = await repository.getNear(37.532600, 127.024612);

    expect(result).not.toBeUndefined();
    expect(result.length).greaterThan(0);
});

test(`[OpenBreweryRepository] should get brewery`, async () => {
    let repository = new OpenBreweryRepository();

    var result = await repository.get('b54b16e1-ac3b-4bff-a11f-f7ae9ddc27e0');

    expect(result).not.toBeUndefined();
});