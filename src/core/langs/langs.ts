import Store from 'core/store';
import { Config } from 'core/config';

/**
 * Access to languages store
 */
export default class LangStore extends Store<string, string> {
	/**
	 * Instance of singleton
	 */
	protected static instance?: LangStore;

	override get(key: string): CanUndef<string> {
		this.updateStore();
		return this.store.get(key);
	}

	constructor(initData?: Iterable<[string, string]>) {
		if (LangStore.instance == null) {
			super(initData);
			LangStore.instance = this;
		}

		return LangStore.instance;
	}

	override getDict(): Dictionary<string> {
		this.updateStore();
		return Object.fromEntries(this.store.entries());
	}

	protected updateStore(): void {
		const
			customLangs = Config.langs;

		if (!customLangs) {
			return;
		}

		this.store = new Map([
			...this.store,
			...Object.entries(customLangs)
		]);
	}
}
