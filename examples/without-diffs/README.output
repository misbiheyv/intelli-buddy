# core/json

Этот модуль предоставляет набор вспомогательных функций для сериализации/разбора данных в формате JSON.

## Stream API

The `core/json/stream` submodule provides an API to work with JSON in stream form.

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

## Revivers

### convertIfDate

Um reviver para o método `JSON.parse`: converte todas as strings que se parecem com uma data para o tipo Date.

```js
import { convertIfDate } from 'core/json';

// true
console.log(JSON.parse("2015-10-12", convertIfDate).is(new Date(2015, 9, 12)));
```
