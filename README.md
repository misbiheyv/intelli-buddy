# intelli-buddy
Этот пакет предоставляет помощника для работы с кодом

# Setup
```bash
npm i intelli-buddy
```
Make an `ai-config.json` in the root of your project and connect [json schema](https://github.com/misbiheyv/intelli-buddy/blob/main/ai-config.schema.json). 
It should help you to make a valid config:
```json
{
	"$schema": "node_modules/intelli-buddy/ai-config.schema.json"
}
```

Then fill the config. You can see the example of config [here](https://github.com/misbiheyv/intelli-buddy/blob/main/ai-config.example.json) and look at the config structure  with more explanations [here](#config)


## API
## processFile(path: string, showDiff: boolean)

Чтобы была возможность выделять места, которые необходимо обработать, для работы с файлами, было решено поддержать тэг `{\{#ai}}...{\{/ai}}`

Например, в тексте будут исправлены грамматические ошибки:
```js
{\{#ai}}Внутри тэгов контент, который необходимо обработать{\{/ai}}
```
Тэг поддерживает аттрибуты для указания промптов

### lang="ru|en"
Аттрибут для перевода текста. Содержимое будет переведено на русский язык:
```js
{{#ai lang="ru"}}Text for translation{{/ai}}
```

Поддержка кастомных языков реализуется через файл конфигурации:
```js
// ai-config.json
{
	"langs": {
		"pt": "portuguese"
	}
}
```
Содержимое будет переведено на португальский язык:
```js
// **/[fileName].[ext]
{{#ai lang="pt"}}Text for improvement{{/ai}}
```

### prompt="Custom prompt"
Аттрибут, в котором вы можете написать свой промпт. Содержимое будет переведено на португальский язык:
```js
{{#ai prompt="translate text to portuguese"}}Text for translation{{/ai}}
```

### customPromptName="true"
Поддержка полностью кастомных аттрибутов через файл конфигурации:
```js
// ai-config.json
{
	"prompts": {
		"func": "return js function by description:"
	}
}
```
Вернет функцию, суммирующую числа на js:
```js
// **/your-file.ext
{{#ai func="true"}}summarize numbers{{/ai}}
```

## processData(content: string)
Функция принимает контент, и возвращает ответ с указанного в конфиге эндпоинта

# <a id="config"></a>Структура ai-config.json
Конфиг поддерживает 4 поля на верхнем уровне (обязательные: request, response):
```json
{
	"request": {...},
	"response": {...},
	"prompts": {...},
	"langs": {...}
}
```
- request - содежрит информацию о запросе
- response - содежрит информацию о том, как распарсить ответ
- prompts? - опционально, ваши кастомные шорткаты с промпами
- langs? - опционально, ваши кастомные шорткаты с языками

### Структура поля `request`
Поддерживает 4 поля для построения запроса
```json
{
	"url": "string",
	"method": "post",
	"headers": {...},
	"body": {
		... ,
		"foo": "{\{prompt}}",
		...
	}
}
```
- url - url вашего эндпоинта
- method - метод HTTP запроса POST | PUT | GET
- headers - заголовки вашего запроса
- body - тело вашего запроса
	- Для обозначения места, куда должен быть вставлен сгенерированный промпт используйте плейсхолдер `{\{prompt}}`

### Структура поля `response`
Поддерживает 3 поля для информации о парсинге ответа
```json
{
	"contentPath": "...",
	"errorPath": "...",
	"statusCodePath": "...",
	"successStatus": [200, 201, ...]
}
```
- contentPath - строка с указанием пути
- errorPath - строка с указанием пути для вывода ошибки
- statusCodePath - строка с указанием пути для проверки статуса ответа
- successStatus - перечень статусов, которые считаются успешным ответом

### Поле `prompts`
#### Структура:
Словарь, где ключ и значение - строки
```json
{
	"func": "Generate js function by description:"
}
```
#### Назначение:
После добавления появляется возможность использовать кастомный аттрибут в шаблонах
```js
{\{#ai func="true"}}суммирование чисел{\{/ai}}
```
После обработке будет сгенерирована функция суммирования чисел на js

### Поле `langs`
#### Структура:
Словарь, где ключ и значение - строки
```json
{
	"pt": "portuguese"
}
```
#### Назначение:
После добавления кастомного языка появляется возможность указывать его ключ в аттрибуте `lang`
```js
{\{#ai lang="pt"}}Text for translation{\{/ai}}
```
Текст будет переведен на португальский
