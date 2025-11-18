import { Result } from "../util/result";
import DataModel from "./model";

export abstract class Service<T extends DataModel<I>, I extends string | number> {
    abstract get<
        R extends QueryReturnType, O extends Operation
    >(query: Query<R, O, T, I>): Promise<Result<
        R extends "single" ? T : T[]
    >>;
}

const compileMultiConstraints = (constraints: Constraint[], start: string): string =>
    `${start}(${constraints.map(compileConstraint).join(",")})`;

const listify = (value: any): string => Array.isArray(value) ? `(${value.join(',')})` : String(value);

export function compileConstraint(constraint: Constraint): [string,string,string] {
    let value: string;
    switch (constraint.short) {
        case "and":
            value = compileMultiConstraints( (constraint as And).constraints, "and" );
            break;
        case "or":
            value = compileMultiConstraints( (constraint as Or).possibilities, "or" );
            break;
        case "eq":
            value = listify( (constraint as Equals).equals );
            break;
        case "neq":
            value = listify( (constraint as Not).not );
            break;
        case "in":
            value = listify( (constraint as In).list );
            break;
        case "lt":
            value = listify( (constraint as Less).min );
            break;
        case "lte":
            value = listify( (constraint as LessEqual).min );
            break;
        case "gt":
            value = listify( (constraint as Greater).max );
            break;
        case "gte":
            value = listify( (constraint as GreaterEqual).max );
            break;
        case "like":
            value = listify( (constraint as Like).like );
            break;
        default:
            throw Error("Unknown constraint type");
    }

    return [constraint.field, constraint.short, value];
}

type QueryReturnType = "single" | "list";

enum Operation {
    "create",
    "read",
    "update",
    "delete"
}

export interface Query<
    R extends QueryReturnType,
    O extends Operation,
    T extends DataModel<I>,
    I extends string | number = string | number,
> {
    id: O extends Operation.read | Operation.update
        ? (R extends "single" ? I : I[]) : null
    data: O extends Operation.create | Operation.read
        ? (R extends "single" ? T : T[]) : null
    constraints: ConstraintNotAnd[]
}

type ConstraintShort =
    "eq" |
    "neq" |
    "in" |
    "like" |
    "or" |
    "and" |
    "gt" |
    "gte" |
    "lt" |
    "lte"

interface QueryConstraint<C extends ConstraintShort> {
    short: C
    field: string
}

export interface Equals extends QueryConstraint<"eq"> {
    equals: any
}

export interface In extends QueryConstraint<"in"> {
    list: any[]
}

export interface Not extends QueryConstraint<"neq"> {
    not: any
}

export interface Less extends QueryConstraint<"lt"> {
    min: number
}
export interface LessEqual extends QueryConstraint<"lte"> {
    min: number
}
export interface Greater extends QueryConstraint<"gt"> {
    max: number
}
export interface GreaterEqual extends QueryConstraint<"gte"> {
    max: number
}

export interface Like extends QueryConstraint<"like"> {
    like: any
}

export interface Or extends QueryConstraint<"or"> {
    possibilities: ConstraintNotOr[]
}

export interface And extends QueryConstraint<"and"> {
    constraints: ConstraintNotAnd[]
}

type ConstraintBase = Equals | In | Not | Less | LessEqual | Greater | GreaterEqual | Like;

export type Constraint = ConstraintBase | Or | And;
export type ConstraintNotOr = ConstraintBase | And;
export type ConstraintNotAnd = ConstraintBase | Or;