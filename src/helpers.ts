import { IUseClassProvider, IUseFactoryProvider, IUseValueProvider, Provider } from './provider';

export type Abstract<T> = Function & { prototype: T };
export type Constructor<T> = new (...args: any[]) => T;
export type Class<T> = Abstract<T> | Constructor<T>;

export function isUseClassProvider<T>(provider: Provider<T>): provider is IUseClassProvider<T> {
	return !!(provider && (<IUseClassProvider<T>>provider).useClass);
}

export function isUseFactoryProvider<T>(provider: Provider<T>): provider is IUseFactoryProvider<T> {
	return !!(provider && (<IUseFactoryProvider<T>>provider).useFactory);
}

export function isUseValueProvider<T>(provider: Provider<T>): provider is IUseValueProvider<T> {
	return !!(provider && (<IUseValueProvider<T>>provider).useValue);
}