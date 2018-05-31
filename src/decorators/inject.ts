import { Class } from '../helpers';
import { InjectionToken } from '../token';
import { injector } from '../injector';

export function Inject<T>(token: Class<T> | InjectionToken<T>): any {
	let instance;
	return (target: any, propertyKey: string): void => {
		Object.defineProperty(target, propertyKey, {
			get() {
				return instance || injector.get(token)
			}
		})
	}
}