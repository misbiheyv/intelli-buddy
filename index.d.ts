type CanUndef<T> = T | undefined;

interface Dictionary<T = unknown> {
	[key: PropertyKey]: CanUndef<T>;
}
