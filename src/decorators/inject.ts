import { Class } from '../helpers';
import { InjectionToken } from '../token';
import { injector } from '../injector';
import { injectorToken } from '../constants';

export function Inject<T>(token: Class<T> | InjectionToken<T>): any {
	let instance, localInjector;
	return (target: any, propertyKey: string): void => {
		Object.defineProperty(target, propertyKey, {
			get() {
				localInjector = localInjector || this.constructor[injectorToken] || injector;
				return instance || (instance = localInjector.get(token))
			}
		})
	}
}