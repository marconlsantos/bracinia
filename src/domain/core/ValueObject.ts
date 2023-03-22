interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    public props: T;

    protected constructor(props: T) {
        this.props = {
            ...props,
        };
    }

    get Value() {
        return this.props;
    }
}