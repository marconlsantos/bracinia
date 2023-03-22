import { ValueObject } from "../core/ValueObject";

interface CoordinateProps {
    readonly longitude: number;
    readonly latitude: number;
}

export class Coordinates extends ValueObject<CoordinateProps> {

    constructor(props: CoordinateProps) {
        super(props);
    }
}
