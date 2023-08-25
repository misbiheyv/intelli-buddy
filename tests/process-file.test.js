const {processFile} = require('../dist/cjs/index.js');
const {

	fillTestFile,
	testFilePath,
	clearTestFile,
	readFile

} = require('./helpers.js');

describe('`processFile`', () => {
	let
		data;

	beforeEach(() => {
		fillTestFile();
	});

	afterAll(() => {
		clearTestFile();
	});

	describe('Should resolve template using endpoint from `ai-config.json`', () => {
		test('Without `showDiffs`', async () => {
			await processFile(testFilePath);
			data = readFile(testFilePath);

			expect(data).not.toContain('{{#ai');
			expect(data).not.toContain('{{/ai}}');
			expect(data).not.toContain('undefined');
		});

		test('With `showDiffs`', async () => {
			await processFile(testFilePath, true);
			data = readFile(testFilePath);

			expect(data).not.toContain('{{#ai');
			expect(data).not.toContain('{{/ai}}');
			expect(data).not.toContain('undefined');

			expect(data).toContain('<<<<<<<');
			expect(data).toContain('=======');
			expect(data).toContain('>>>>>>>');
		});
	});
});
