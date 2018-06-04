import { injector } from '../injector';

export function Injectable() {
	return (target: any) => {
		injector.provide(target, { useClass: target })
	}
}