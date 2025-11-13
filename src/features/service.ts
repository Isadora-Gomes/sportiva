import DataModel from "./model";

export abstract class Service<T extends DataModel<I>, I extends string | number> {}