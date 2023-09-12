import Handlebars from 'handlebars';
import asyncHelpers from 'handlebars-async-helpers';
import request from 'core/request';
import prompts from 'core/prompts';
import langs from 'core/langs';

const
  asyncHandlebars = asyncHelpers(Handlebars);

/**
 * Resolves `{{#ai}}...{{/ai}}` tags in template
 */
asyncHandlebars.registerHelper('ai', async function (this: {showDiff: boolean}, ...args) {
  const
    originContent = await args.at(-1).fn(this),
    params = args.at(-1).hash;

  let
    prompt = '';

  if (params.prompt == null) {
    Object.entries(prompts.getDict()).forEach(([k, v]) => {
      if (params[k] != null) {
        prompt += ` ${Handlebars.compile(v)({lang: langs.get(params.lang)}).trim()}`;
      }
    });

  } else {
    prompt = params.prompt;
  }

  if (prompt === '') {
    prompt = prompts.get('basic')!;
  }

  prompt += ' Return only the corrected text. Use original text language.';

  const
    newCtx = await request(`${prompt}:\n${originContent}`);

  if (this.showDiff) {
    return `\n<<<<<<< ORIGINAL VERSION\n${originContent}\n=======\n${newCtx}\n>>>>>>> CORRECTED VERSION\n`;
  }

  return newCtx;
});

export {asyncHandlebars};
