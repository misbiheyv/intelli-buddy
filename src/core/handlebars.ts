import Handlebars from 'handlebars';
import asyncHelpers from 'handlebars-async-helpers';

import { request as requestBuddy, langs } from './ai-buddy';

const
  asyncHandlebars = asyncHelpers(Handlebars);

/**
 * Improve the text grammar and translate if need it
 */
asyncHandlebars.registerHelper('ai', async function (...args) {
  const
    originContent = await args.at(-1).fn(this),
    params = args.at(-1).hash;

  let
    prompt = '';

  if (params.lang != null && langs[params.lang]) {
    prompt += `Translate the text below on ${langs[params.lang]} language.`;
  }

  if (params.improve != null) {
    prompt += 'Improve text. Use original text language';
  }

  if (params.prompt != null) {
    prompt = params.prompt;
  }

  if (prompt === '') {
    prompt = 'Fix grammar mistakes.';
  }

  prompt += 'Return only the corrected text';

  const
    newCtx = await requestBuddy(`${prompt}:\n${originContent}`);

  if (this.showDiff) {
    return `\n<<<<<<< ORIGINAL VERSION\n${originContent}\n=======\n${newCtx}\n>>>>>>> CORRECTED VERSION\n`;
  }

  return newCtx;
});

export {asyncHandlebars};