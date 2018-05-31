import { Constructor } from './helpers';

export interface IUseValueProvider<T> {
	useValue: T
}

export interface IUseClassProvider<T> {
	useClass: Constructor<T>;
	deps?: any[]
}

export interface IUseFactoryProvider<T> {
	useFactory: (...args: any[]) => T;
	deps?: any[]
}

export type Provider<T> = IUseClassProvider<T> | IUseValueProvider<T> | IUseFactoryProvider<T>;