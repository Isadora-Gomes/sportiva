import { useEffect, useState } from "react";

type FormData<F = {}> = {
    [K in keyof F]?: F[K]
}

type SetState<T> = React.Dispatch<React.SetStateAction<FormData<T>>>

export default class Form<F = {}> {
    private initialStateFields: FormData<F>;
    private _fields: FormData<F> = {};
    get fields() { return this._fields; }
    private setState!: SetState<F>;

    constructor(fields: FormData<F> = {}) {
        this.initialStateFields = {
            ...fields,
        }
    }

    set<K extends keyof FormData<F>>(key: K, value: F[K]) {
        this._fields = ({
            ...this._fields,
            [key]: value
        });
        this.setState(this._fields);
    }

    private useState() {
        const use = useState(this.initialStateFields);
        this.setState = use[1];
        return use;
    }

    use() {
        this.useState();
    }
}