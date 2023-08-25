const {processData} = require('../dist/cjs/index.js');
const mocks = require('./mocks');

describe('`processData`', () => {
	describe('`{{#ai}}...{{/ai}}`', () => {
		test('Should fix grammar mistakes in the text.', async () => {
			const
				data = await processData(mocks.base);
	
			expect(data).not.toContain('{{#ai');
			expect(data).not.toContain('{{/ai}}');
			expect(data).not.toContain('undefined');
		});
	});

	describe('`{{#ai improve="true"}}...{{/ai}}`', () => {
		test('Should fix grammar mistakes and improve the text style.', async () => {
			const
				data = await processData(mocks.improve);
	
			expect(data).not.toContain('{{#ai');
			expect(data).not.toContain('{{/ai}}');
			expect(data).not.toContain('undefined');
		});
	});

	describe('`{{#ai translate="ru"}}...{{/ai}}`', () => {
		test('Should translate the content to russian.', async () => {
			const
				data = await processData(mocks.translate);
	
			expect(data).not.toContain('{{#ai');
			expect(data).not.toContain('{{/ai}}');
			expect(data).not.toContain('undefined');
		});
	});

	describe('`{{#ai prompt="write js function by description"}}...{{/ai}}`', () => {
		test('Should replace the content with a summarize function.', async () => {
			const
				data = await processData(mocks.prompt);
	
			expect(data).not.toContain('{{#ai');
			expect(data).not.toContain('{{/ai}}');
			expect(data).not.toContain('undefined');
		});
	});

	describe('`{{#ai prompt=""}}...{{/ai}}`', () => {
		test('Should reduce the content to 2 sentences', async () => {
			const
				data = await processData(mocks.customPrompt);
	
			expect(data).not.toContain('{{#ai');
			expect(data).not.toContain('{{/ai}}');
			expect(data).not.toContain('undefined');
		});
	});
});
