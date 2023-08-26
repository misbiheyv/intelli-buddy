import Store from 'core/store';
import { Config } from 'core/config';

/**
 * Access to prompts store
 */
export default class PromptsStore extends Store<string, string> {
	/**
	 * Instance of singleton
	 */
	protected static instance: PromptsStore;

	override get(key: string): CanUndef<string> {
		this.updateStore();
		return this.store.get(key);
	}

	constructor(initData?: Iterable<[string, string]>) {
		if (PromptsStore.instance == null) {
			super(initData);
			PromptsStore.instance = this;
		}

		return PromptsStore.instance;
	}

	override getDict(): Dictionary<string> {
		this.updateStore();
		return Object.fromEntries(this.store.entries());
	}

	/**
	 * Updates store by values from the config
	 */
	protected updateStore(): void {
		const
			customPrompts = Config.prompts;

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
