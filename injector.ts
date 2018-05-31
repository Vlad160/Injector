import { Class } from './helpers';
import { InjectionToken } from './token';
import { Provider } from './provider';

export class Injector {

    private _providers = new Map<any, any>();
    private _instances = new Map<any, any>();

    constructor(private readonly parent: Injector) {

    }

    get<T>(token: Class<T> | InjectionToken): T {
        let instance: T = this.find(token);
        if (instance) {
            return instance;
        }
        const provider = this._providers.get(token);
        if (!provider) {
            throw new Error(`There is no token associated with ${token.name}`);
        }
        return this.initialize(provider);
    }

    provide() {

    }

    fork() {

    }

    private initialize(provider: Provider) {

    }

    private find<T>(token: Class<T> | InjectionToken) {
        return this._instances.get(token);
    }

}