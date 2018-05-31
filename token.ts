export class InjectionToken<T> {
	constructor(public readonly name: string,
				public readonly desc?: string) {
	}
}