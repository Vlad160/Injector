import { Class, isUseClassProvider, isUseFactoryProvider, isUseValueProvider } from './helpers';
import { InjectionToken } from './token';
import { Provider } from './provider';

export class Injector {

	private _providers = new Map<any, any>();
	private _instances = new Map<any, any>();

	constructor(private readonly parent: Injector) {
		this._instances.set(Injector, this);
	}

	get<T>(token: Class<T> | InjectionToken<T>): T {
		let injector: Injector = this;
		do {
			try {
				const instance: T = injector.tryResolveInstance(token);
				if (instance) {
					return instance;
				}
			}
			catch (e) {
			}
		} while (injector = injector.parent);
	}

	provide<T>(token: Class<T> | InjectionToken<T>, provider: Provider<T>): void {
		if (this._providers.has(token) && provider.multi) {
			const existingProvider: T = this._providers.get(token);
			if (Array.isArray(existingProvider)) {
				this._providers.get(token).push(provider)
			} else {
				this._providers.delete(token);
				this._providers.set(token, [existingProvider, provider])
			}
		}
		this._providers.set(token, provider);
	}

	fork(): Injector {
		return new Injector(this);
	}

	private initialize<T>(provider: Provider<T>): T {
		const resolveDeps = (deps: any[]) => deps.map((dep: any) => this.tryResolveInstance(dep));
		const deps = resolveDeps((<any>provider).deps || []);
		if (isUseClassProvider(provider)) {
			return new provider.useClass(...deps);
		} else if (isUseFactoryProvider(provider)) {
			return provider.useFactory.apply(null, deps);
		} else if (isUseValueProvider(provider)) {
			return provider.useValue;
		}
	}

	private find<T>(token: Class<T> | InjectionToken<T>): T {
		return this._instances.get(token);
	}

	private tryResolveInstance<T>(token: Class<T> | InjectionToken<T>): T {
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
}

export const injector = new Injector(null);