import { Provider } from '../provider';
import { injector } from '../injector';
import { Class } from '../helpers';
import { InjectionToken } from '../token';

export interface UseProviders {
	provider: Provider<any>,
	token: Class<any> | InjectionToken<any>
}

export function UseProviders<T>(...providers: UseProviders[]) {
	return (target: any) => {
		if (!providers.length) {
			return target;
		}
		const $injector = injector.fork();
		providers.forEach((provider: UseProviders) => $injector.provide(provider.token, provider.provider));
		Object.defineProperty(target, '$injector', {
			configurable: false,
			enumerable: false,
			value: $injector
		});
		return target;
	}
}
