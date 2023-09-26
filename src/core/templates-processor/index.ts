import { asyncHandlebars } from './handlebars';
import Handlebars from 'handlebars';
import { resolveCustomTags } from './helpers';

export const asyncCompile = (content: string) => asyncHandlebars.compile(resolveCustomTags(content));
export const syncCompile = (content: string) => Handlebars.compile(resolveCustomTags(content));
