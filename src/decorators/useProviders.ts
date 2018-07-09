import { Provider } from '../provider';
import { Class } from '../helpers';
import { InjectionToken } from '../token';
import { injectorToken } from '../constants';
import { injector } from '../injector';

export interface UseProviders {
	provider: Provider<any>,
	token: Class<any> | InjectionToken<any>
}

export function UseProviders<T>(...providers: UseProviders[]) {
	return (target: any) => {
		if (!providers.length) {
			return target;
		}
		let parentInjector = target[injectorToken] || injector;
		let targetInjector = parentInjector.fork();
		providers.forEach((provider: UseProviders) => targetInjector.provide(provider.token, provider.provider));
		Object.defineProperty(target, injectorToken, {
			configurable: false,
			enumerable: false,
			value: targetInjector
		});
		return target;
	}
}
