import { Class } from '../helpers';
import { InjectionToken } from '../token';
import { injector } from '../injector';

export function Inject<T>(token: Class<T> | InjectionToken<T>): any {
	let instance, localInjector;
	return (target: any, propertyKey: string, index?: number): void => {
		Object.defineProperty(target, propertyKey, {
			get() {
				localInjector = this.constructor.$injector || injector;
				return instance || (instance = localInjector.get(token))
			}
		})
	}
}