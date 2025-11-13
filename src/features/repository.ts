import { Failure, Result } from "../util/result";
import DataModel from "./model";
import { Service } from "./service";

export abstract class Repository<T extends DataModel<I>, I extends string | number> {
    readonly ttl: number | null;
    private readonly data: Map<I, T> = new Map();
    private readonly service: Service<T, I>;

    constructor(ttl: number | null = null, service: Service<T, I>) {
        this.ttl = ttl;
        this.service = service;
    }

    protected abstract getOnService(): Promise<Result<T | T[]>>;

    async get<R extends QueryReturnType>(query: Query<R, T, I>): Promise<Result<
        R extends "single" ? T : T[]
    >> {
        return Failure.error("Unimplemented");
    }
}

type QueryReturnType = "single" | "list";

export interface Query<
    R extends QueryReturnType,
    T extends DataModel<I>,
    I extends string | number = string | number
> {

}