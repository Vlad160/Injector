import 'reflect-metadata';
import { injector } from './injector';
import { Inject } from './decorators/inject';
import { UseProviders } from './decorators/useProviders';

class Foo {
	name = 'foooooo';
}

injector.provide(Foo, { useClass: Foo });

class FakeFoo {
	name = 'fakeFoo';
}

@UseProviders(
	{ token: Foo, provider: { useClass: FakeFoo } }
)
class Bar {
	@Inject(Foo) foo;
	name = 'foo2';
}


const bar = new Bar();

console.log(bar.foo.name);

