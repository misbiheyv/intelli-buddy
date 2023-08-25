# intelli-buddy

This package provides helpers for working with code and documentation.

# Overview

To understand why it is needed and what problems it can solve, please see the [examples](https://github.com/misbiheyv/intelli-buddy/tree/main/examples) folder.

Files *.input.[ext] - templates that are received as input.

Files *.output.[ext] - corresponding processed files.

# Setup
```bash
npm i intelli-buddy
```
Make an `ai-config.json` in the root of your project.
You can connect the [json schema](https://github.com/misbiheyv/intelli-buddy/blob/main/ai-config.schema.json). It should help you to make a valid config:

```json
{
	"$schema": "node_modules/intelli-buddy/ai-config.schema.json"
}
```

Then you should fill the config. You can look at the [ai-config.example.json](https://github.com/misbiheyv/intelli-buddy/blob/main/ai-config.example.json) and at the [config structure](#config) for more explanations

# API
## processFile(path: string, showDiff: boolean)
Function accepts a path to the template file as input. Optionally, as a second argument, you can specify whether to display diffs or immediately overwrite the file.

To be able to highlight areas that need processing when working with files, it was decided to support the tag {{#ai}}any content{{/ai}}.

For example, tag without any attrivutes will correct grammar errors in the text:
```js
{\{#ai}}Inside the tags is the content that needs processing{\{/ai}}
```
The tag supports attributes for specifying prompts.

### lang="ru|en"
Attribute for translating text. E.g. this content will be translated into the Russian language:
```js
{\{#ai lang="ru"}}Text for translation{\{/ai}}
```

Custom language support is implemented through the configuration file:
```js
// ai-config.json
{
	"langs": {
		"pt": "portuguese"
	}
}
```
The content will be translated into the Portuguese language:
```js
// **/[fileName].[ext]
{\{#ai lang="pt"}}Text for improvement{\{/ai}}
```

### prompt="Custom prompt"
An attribute in which you can write your own prompt. For example, this content will be translated into the Portuguese language:
```js
{\{#ai prompt="translate text to portuguese"}}Text for translation{\{/ai}}
```

### customPromptName="true"
Support for fully custom attributes through the configuration file
```js
// ai-config.json
{
	"prompts": {
		"func": "return js function by description:"
	}
}
```
Returns a function that adds up numbers in JavaScript:
```js
// **/your-file.ext
{\{#ai func="true"}}summarize numbers{\{/ai}}
```

## processData(content: string)
The function takes content and returns the parsed response from the specified endpoint in the config without support for tag syntax

# <a id="config"></a>`ai-config.json` structure
Config provides 4 top-level fields:
```json
{
	"request": {},
	"response": {},
	"prompts": {},
	"langs": {}
}
```
- [request](#request) - contains a request information
- [response](#response) - contains information about response parsing
- [prompts](#prompts)? - optional, custom prompts
- [langs](#langs)? - optional, additional langs

### <a id="request"></a>`request` field structure
Provides 4 fields for a request building
```json
{
	"url": "string",
	"method": "post",
	"headers": {
		"Auth": "token"
	},
	"body": {
		"foo": "{\{prompt}}",
	}
}
```
- url - contains the endpoint url
- method - contains the HTTP request method: POST | PUT
- headers - contains dictionary of the request headers
- body - contains the request body
	- To indicate the place where the generated prompt will be inserted, use the placeholder `{\{prompt}}`

### <a id="response"></a>`response` field structure
Provides 4 fields with information for response parsing
```json
{
	"contentPath": "path.to.content",
	"errorPath": "path.to.error",
	"statusCodePath": "path.tp.statusCode",
	"successStatus": [200, 201]
}
```
- contentPath - string path to response content
- errorPath - string path to response error text
- statusCodePath - string path to response statusCode
- successStatus - list of successful status codes

### <a id="prompts"></a>`prompts` field structure
Dictionary where both key and value are strings
```json
{
	"func": "Generate js function by description:"
}
```
After adding entries, you have the ability to use custom attributes in the tag:
```js
{\{#ai func="true"}}Summation of numbers{\{/ai}}
```
A function for summing numbers in JavaScript will be generated, as specified in our prompt.

### <a id="langs"></a>`langs` field structure
Dictionary where both key and value are strings
```json
{
	"pt": "portuguese"
}
```

After adding a custom language, you have the ability to specify its key in the `lang` attribute

```js
{\{#ai lang="pt"}}Text for translation{\{/ai}}
```
Text will be translated into portuguese
