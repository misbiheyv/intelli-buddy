import Store from '../store';
import { Config } from '../config';

export default class LangStore extends Store<string, string> {
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
			customLangs = new Config().langs;

		if (!customLangs) {
			return;
		}

		this.store = new Map([
			...this.store,
			...Object.entries(customLangs)
		]);
	}
}
