export class InjectionToken<T> {
	constructor(public readonly name: string,
				public readonly desc?: string) {
	}

	toString(): string {
		return `Injection token: ${this.name}. ${this.desc ? `Description: ${this.desc}` : ''}`;
	}
}