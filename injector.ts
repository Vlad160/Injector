import { Class, isUseClassProvider } from './helpers';
import { InjectionToken } from './token';
import { Provider } from './provider';

export class Injector {

	private _providers = new Map<any, any>();
	private _instances = new Map<any, any>();

	constructor(private readonly parent: Injector) {

	}

	get<T>(token: Class<T> | InjectionToken<T>): T {
		let instance: T = this.find(token);
		if (instance) {
			return instance;
		}
		const provider = this._providers.get(token);
		if (!provider) {
			throw new Error(`There is no token associated with ${token.name}`);
		}
		instance = this.initialize(provider);
		if (instance) {
			this._instances.set(token, instance);
			return instance;
		} else {
			throw Error(`Can not initialize instance for ${token.name}`);
		}
	}

	provide<T>(token: Class<T> | InjectionToken<T>, provider: Provider<T>): void {
		this._providers.set(token, provider);
	}

	fork(): Injector {
		return new Injector(this);
	}

	private initialize<T>(provider: Provider<T>): T {
		if (isUseClassProvider(provider)) {
			return new provider.useClass();
		}
	}

	private find<T>(token: Class<T> | InjectionToken<T>): T {
		return this._instances.get(token);
	}

}