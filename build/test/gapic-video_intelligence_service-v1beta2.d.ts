declare class FakeError {
    name: string;
    message: string;
    code: number;
    constructor(n: number);
}
export interface Callback {
    (err: FakeError | null, response?: {} | null): void;
}
export declare class Operation {
    constructor();
    promise(): void;
}
export {};
