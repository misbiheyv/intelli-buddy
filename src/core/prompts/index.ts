import PromptsStore from './prompts';
import { prompts } from './const';

export default new PromptsStore(Object.entries(prompts));
