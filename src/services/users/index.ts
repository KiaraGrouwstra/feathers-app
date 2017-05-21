import { models } from '../../models';
import { hooks } from './users.hooks';
import { filters } from './users.filters';

export const users = {
  factory: models.user,
  hooks,
  filters,
  // middlewares: [],
  // paginate: {},
};
