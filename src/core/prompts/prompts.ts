import Store from '../store';
import { Config } from '../config';

export default class PromptsStore extends Store<string, string> {
	override get(key: string): CanUndef<string> {
		this.updateStore();
		return this.store.get(key);
	}

	override getDict(): Dictionary<string> {
		this.updateStore();
		return Object.fromEntries(this.store.entries());
	}

	protected updateStore(): void {
		const
			customPrompts = new Config().prompts;

		if (!customPrompts) {
			return;
		}

		this.store = new Map([
			...this.store,
			...Object.entries(customPrompts),
			['basic', this.store.get('basic')!],
			['lang', this.store.get('lang')!]
		]);
	}
}
