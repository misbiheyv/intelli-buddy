import { asyncHandlebars } from './handlebars';
import Handlebars from 'handlebars';

export const asyncCompile = asyncHandlebars.compile;
export const syncCompile = Handlebars.compile;
