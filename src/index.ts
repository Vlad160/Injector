import 'reflect-metadata';
import { Inject } from './decorators/inject';
import { Injector } from './injector';

class Foo {
	@Inject(Injector)
	injector: Injector;

}

const foo = new Foo();

console.log(foo.injector);