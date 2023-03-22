import { ValueObject } from "../core/ValueObject";

interface AddressProps {
    readonly street: string;
    readonly address_2: any;
    readonly address_3: any;
    readonly city: string;
    readonly state: string;
    readonly county_province: any;
    readonly postal_code: string;
    readonly country: string;
}

export class Address extends ValueObject<AddressProps> {
    constructor(props: AddressProps) {
        super(props);
    }
}
