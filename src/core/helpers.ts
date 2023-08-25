/**
 * Returns a value from the object using the string path
 *
 * @param obj
 * @param [path]
 */
export function getField(obj: object, path: string = '') {
  return get(obj, path.split('.').reverse());

  function get(obj: object, path: string[]) {
    const
      cur = path.pop();

    if (cur == null) {
      return undefined;
    }

    if (path.length === 0) {
      return obj[cur];
    }

    if (typeof obj[cur] === 'object') {
      return get(obj[cur], path);
    }
  }
}
