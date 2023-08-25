/** 
 * Text should be reduced to 2 sentences 
 */
const customPrompt = `{{#ai prompt="contain the text into 2 statements"}}
What is JavaScript?
JavaScript was initially created to “make web pages alive”.

The programs in this language are called scripts. They can be written right in a web page’s HTML and run automatically as the page loads.

Scripts are provided and executed as plain text. They don’t need special preparation or compilation to run.

In this aspect, JavaScript is very different from another language called Java.
{{/ai}}`;

/** 
 * Grammar errors should be fixed
 */
const base = `{{#ai}}Shuld fix gramar erors here{{/ai}}`;

/** 
 * Text style should be improved and grammar errors should be fixed 
 */
const improve = `{{#ai improve="true"}}My name is Misha my age is 21 i am programer{{/ai}}`;

/**
 * Text should be translated to russian
 */
const translate = `{{#ai lang="ru"}}My name is Misha and I'm a programmer{{/ai}}`;

/** 
 * Should be replaced by summarize function
 */
const prompt = `
{{#ai prompt="write js function by description"}}
I want to summarize numbers
{{/ai}}
`;

module.exports = {
	customPrompt,
	base,
	improve,
	translate,
	prompt
};
