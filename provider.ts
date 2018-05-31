export interface IUseValueProvider<T> {
    useValue: T
}

export interface IUseClassProvider<T> {
    useClass: T;
    deps?: any[]
}

export interface IUseFactoryProvider<T> {
    useFactory: (...args: any[]) => T;
    deps?: any[]
}

export type Provider<T> = IUseClassProvider<T> | IUseClassProvider<T> | IUseFactoryProvider<T>;