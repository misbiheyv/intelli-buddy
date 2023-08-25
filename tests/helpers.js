const {writeFileSync, appendFileSync, readFileSync} = require('fs');
const path = require('path');
const mocks = require('./mocks');

const
	testFilePath = path.resolve('tests/test.txt');

/**
 * Fills test file by mock`s data
 */
function fillTestFile() {
	Object.values(mocks).forEach((prompt, idx) => {
		if (idx === 0) {
			writeFileSync(testFilePath, prompt);
		} else {
			appendFileSync(testFilePath, `\n${prompt}`);
		}
	});
}

/**
 * Clears test file
 */
function clearTestFile() {
	writeFileSync(testFilePath, '');
}

/**
 * Reads file sync
 *
 * @param {string} path
 */
function readFile(path) {
	return readFileSync(path, 'utf-8');
}

module.exports = {
	testFilePath,
	fillTestFile,
	clearTestFile,
	readFile
}