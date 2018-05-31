import { Constructor } from './helpers';

export interface IUseValueProvider<T> {
	useValue: T;
	multi?: boolean;
}

export interface IUseClassProvider<T> {
	useClass: Constructor<T>;
	deps?: any[];
	multi?: boolean;
}

export interface IUseFactoryProvider<T> {
	useFactory: (...args: any[]) => T;
	deps?: any[];
	multi?: boolean;
}

export type Provider<T> = IUseClassProvider<T> | IUseValueProvider<T> | IUseFactoryProvider<T>;