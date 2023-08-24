import Handlebars from 'handlebars';
import asyncHelpers from 'handlebars-async-helpers';
import {request as requestBuddy, langs, prompts} from './ai-buddy';

const
  asyncHandlebars = asyncHelpers(Handlebars);

/**
 * 
 */
asyncHandlebars.registerHelper('ai', async function (this: {showDiff: boolean}, ...args) {
  const
    originContent = await args.at(-1).fn(this),
    params = args.at(-1).hash;

  let
    prompt = '';

  if (params.prompt == null) {
    for (const [k, v] of Object.entries(prompts)) {
      if (params[k] != null) {
        prompt += ` ${Handlebars.compile(v)({lang: langs[params.lang]}).trim()}`;
      }
    }

  } else {
    prompt = params.prompt;
  }

  if (prompt === '') {
    prompt = prompts.basic;
  }

  prompt += ' Return only the corrected text';

  const
    newCtx = await requestBuddy(`${prompt}:\n${originContent}`);

  if (this.showDiff) {
    return `\n<<<<<<< ORIGINAL VERSION\n${originContent}\n=======\n${newCtx}\n>>>>>>> CORRECTED VERSION\n`;
  }

  return newCtx;
});

export {asyncHandlebars};
