# core/json

{{#ai lang="ru"}}This module provides a bunch of helper functions to serialize/parse JSON data.{{/ai}}

## Stream API

{{#ai}}`core/json/stream` submodule provide api to work wih json in strem form.{{/ai}}

```js
import { convertIfDate } from 'core/json';
import { from, pick, streamArrray } from 'core/json/stream';

const
  parser = streamArrray(pick(from('{"data": [1, 2, 3]}'), 'data'), {reviver: convertIfDate});

for await (const val of parser) {
  // {index: 0, value: 1}
  // {index: 1, value: 2}
  // {index: 2, value: 3}
  console.log(val);
}
```
{{#ai prompt="translate to portuguese"}}
## Revivers

### convertIfDate

A reviver for the `JSON.parse` method: converts all strings that are looks like a date to Date.

```js
import { convertIfDate } from 'core/json';

// true
console.log(JSON.parse('"2015-10-12"', convertIfDate).is(new Date(2015, 9, 12)));
```
{{/ai}}
