import { Injector } from '../src/injector';
import { Bar, CONSTANTS, Foo } from './utils';

describe('Provide test', () => {
	let injector: Injector;
	beforeEach(() => {
		injector = new Injector(null);
		expect(injector).toBeDefined();
	});

	it('should get instance', () => {
		const instance = new Foo();
		injector[CONSTANTS.INSTANCES].set(Foo, instance);
		expect(injector.get(Foo)).toBe(instance);
	});

	it('should not get instance', () => {
		const instance = new Foo();
		injector['_instances'].set(Foo, instance);
		expect(injector.get(Bar)).toBeNull();
	});
	it('should get instance from parent', () => {
		const instance = new Foo();
		const childInjector = new Injector(injector);
		injector[CONSTANTS.INSTANCES].set(Foo, instance);
		expect(childInjector.get(Foo)).toBe(instance);
	});

	it('should provide class with useClass provider', () => {
		injector.provide(Foo, { useClass: Foo });
		expect(injector[CONSTANTS.PROVIDES].get(Foo)).toBeDefined();
	});

	it('should provide class without provider as useClass provider', () => {
		injector.provide(Foo);
		const fooProvider = injector[CONSTANTS.PROVIDES].get(Foo);
		expect(fooProvider).toBeDefined();
		expect(fooProvider.useClass.name).toBe('Foo');
	});

	it('should provide multi for existing provider', () => {
		injector.provide(Foo);
		expect(injector[CONSTANTS.PROVIDES].get(Foo)).toBeDefined();
		expect(typeof injector[CONSTANTS.PROVIDES].get(Foo)).toBe('object');
		expect(Array.isArray(injector[CONSTANTS.PROVIDES].get(Foo))).toBeFalsy();
		injector.provide(Foo, { useClass: Bar, multi: true });
		expect(injector[CONSTANTS.PROVIDES].get(Foo)).toBeDefined();
		expect(typeof injector[CONSTANTS.PROVIDES].get(Foo)).toBe('object');
		expect(Array.isArray(injector[CONSTANTS.PROVIDES].get(Foo))).toBeTruthy();
		expect(injector[CONSTANTS.PROVIDES].get(Foo).length).toBe(2);
	});

	it('should provide multi for existing multi provider', () => {
		injector.provide(Foo, { useClass: Foo, multi: true });
		expect(injector[CONSTANTS.PROVIDES].get(Foo)).toBeDefined();
		expect(typeof injector[CONSTANTS.PROVIDES].get(Foo)).toBe('object');
		expect(Array.isArray(injector[CONSTANTS.PROVIDES].get(Foo))).toBeTruthy();
		expect(injector[CONSTANTS.PROVIDES].get(Foo).length).toBe(1);
		injector.provide(Foo, { useClass: Bar, multi: true });
		expect(injector[CONSTANTS.PROVIDES].get(Foo)).toBeDefined();
		expect(typeof injector[CONSTANTS.PROVIDES].get(Foo)).toBe('object');
		expect(Array.isArray(injector[CONSTANTS.PROVIDES].get(Foo))).toBeTruthy();
		expect(injector[CONSTANTS.PROVIDES].get(Foo).length).toBe(2);
	});

	it('should throw for multi provider without multi flag', () => {
		injector.provide(Foo);
		expect(injector[CONSTANTS.PROVIDES].get(Foo)).toBeDefined();
		expect(typeof injector[CONSTANTS.PROVIDES].get(Foo)).toBe('object');
		try {
			injector.provide(Foo);
		} catch (e) {
			expect(e).toBeDefined();
		}
	});

	it('should fork injector', () => {
		const childInjector = injector.fork();
		expect(childInjector[CONSTANTS.PARENT]).toBe(injector);
	});
});
