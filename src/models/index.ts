import { modelsFor } from './tools';

const name = 'users';
const uniques = ['email'];

export const models = modelsFor({
  users: { uniques: ['email'] },
});
