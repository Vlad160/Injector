import { IUseClassProvider, Provider } from './provider';

export type Abstract<T> = Function & { prototype: T };
export type Constructor<T> = new (...args: any[]) => T;
export type Class<T> = Abstract<T> | Constructor<T>;

export function isUseClassProvider<T>(provider: Provider<T>): provider is IUseClassProvider<T> {
	return !!(provider && (<IUseClassProvider<T>>provider).useClass);
}