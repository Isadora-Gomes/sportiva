export abstract class Result<R, F = Error> {
    abstract get result(): R | null;
    abstract get failure(): F | null;
}

export class Success<R, F = Error> extends Result<R,F> {
    result: R;
    failure: null = null;
    
    constructor(result: R) {
        super();
        this.result = result;
    }
}

export class Failure<R, F = Error> extends Result<R,F> {
    result: null = null;
    failure: F;

    constructor(failure: F) {
        super();
        this.failure = failure;
    }

    static error<R>(message: string) {
        return new Failure<R>(new Error(message));
    }
}