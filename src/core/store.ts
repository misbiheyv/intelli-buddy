export default class Store<K extends PropertyKey, V> {
	protected store: Map<K, V> = new Map();

	constructor(initData: Iterable<[K, V]>) {
		this.store = new Map(initData);
	}

	get(key: K): CanUndef<V> {
		return this.store.get(key);
	}

	set(key: K, value: V): void {
		if (value != null) {
			this.store.set(key, value);
		}
	}

	getDict(): Dictionary<V> {
		return Object.fromEntries(this.store.entries());
	}
}
