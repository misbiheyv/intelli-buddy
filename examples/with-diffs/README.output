# core/json


<<<<<<< ORIGINAL VERSION
This module provides a bunch of helper functions to serialize/parse JSON data.
=======
Этот модуль предоставляет набор вспомогательных функций для сериализации/разбора данных в формате JSON.
>>>>>>> CORRECTED VERSION


## Stream API


<<<<<<< ORIGINAL VERSION
`core/json/stream` submodule provide api to work wih json in strem form.
=======
The `core/json/stream` submodule provides an API to work with JSON in stream form.
>>>>>>> CORRECTED VERSION


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

<<<<<<< ORIGINAL VERSION
## Revivers

### convertIfDate

A reviver for the `JSON.parse` method: converts all strings that are looks like a date to Date.

```js
import { convertIfDate } from 'core/json';

// true
console.log(JSON.parse('"2015-10-12"', convertIfDate).is(new Date(2015, 9, 12)));
```

=======
## Revivers

### convertIfDate

Um reviver para o método `JSON.parse`: converte todas as strings que se parecem com uma data para o tipo Date.

```js
import { convertIfDate } from 'core/json';

// true
console.log(JSON.parse("2015-10-12", convertIfDate).is(new Date(2015, 9, 12)));
```
>>>>>>> CORRECTED VERSION
