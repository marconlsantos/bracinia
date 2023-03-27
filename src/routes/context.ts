import { createContextId } from "@builder.io/qwik";
import type { Brewery } from "~/domain/entities/Brewery";

interface BraciniaStore {
    currentBrewery: Brewery | undefined;
    isVisible: boolean;
}

export const BRCN = createContextId<BraciniaStore>('Bracinia');