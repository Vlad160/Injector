import { injector } from '../injector';
import { Provider } from '../provider';

export function Injectable(provider?: Provider<any>, localInjector = injector) {
	return (target: any) => {
		localInjector.provide(target, { useClass: target })
	}
}