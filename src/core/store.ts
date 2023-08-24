/**
 * Provides the base sync storage interface
 */
export default abstract class Store<K extends PropertyKey, V> {
	/**
	 * Stores a [key value] data
	 */
	protected store: Map<K, V>;

	constructor(initData?: Iterable<[K, V]>) {
		this.store = new Map(initData);
	}

	/**
	 * Returns a value from the store by the key
	 *
	 * @param key
	 */
	get(key: K): CanUndef<V> {
		return this.store.get(key);
	}

	/**
	 * Adds record in the store
	 *
	 * @param key
	 * @param value
	 */
	set(key: K, value: V): void {
		if (value != null) {
			this.store.set(key, value);
		}
	}

	/**
	 * Returns all values from the store
	 */
	getDict(): Dictionary<V> {
		return Object.fromEntries(this.store.entries());
	}
}
