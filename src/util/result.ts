export class Result<R> {
    result: R | null;
    failure: Failure<R> | null;

    constructor(result: R | null = null, failure: Failure<R> | null = null) {
        this.result = result;
        this.failure = failure;
    }
}

export class Failure<T> {
    readonly reason: string;

    constructor(reason: string) {
        this.reason = reason;
    }

    result(): Result<T> {
        return new Result(null, this);
    }
}