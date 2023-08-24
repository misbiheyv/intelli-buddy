/**
 * Returns value by string path
 */
export function getField(obj, path) {
  return get(obj, path.split('.').reverse());

  function get(obj, path) {
    const
      cur = path.pop();

    if (path.length === 0) {
      return obj[cur];
    }

    if (typeof obj[cur] === 'object') {
      return get(obj[cur], path);
    }
  }
};
