import { Config } from 'core/config';

/**
 * Resolves custom tags in template and converts them to the default handlebars syntax.
 *
 * @param template
 *
 * @example
 * Config.tags.opening = {start: '<', end: '>'};
 * Config.tags.closing = {start: '</', end: '>'};
 * const customTemplate = '<section>Hello, <name>!</section>'
 * resolveCustomTags(customTemplate); // {{#section}}Hello, {{name}}!{{/section}}
 */
export function resolveCustomTags(template: string) : string {
	if (Config.tags == null) {
		return template;
	}

	const
		{start: openTagStart, end: openTagEnd} = Config.tags.opening,
		{start: closeTagStart, end: closeTagEnd} = Config.tags.closing;

	const r = [openTagStart, openTagEnd, closeTagStart, closeTagEnd].sort((a, b) => b.length - a.length).join('|');

	const tagsMappingDict = {
		[openTagStart]: '{{#',
		[openTagEnd]: '}}',
		[closeTagStart]: '{{/',
		[closeTagEnd]: '}}'
	};

	return template.replace(new RegExp(r, 'g'), (tag) => tagsMappingDict[tag]);
}
