import * as feathers from 'feathers';
import { users } from './users/users.service';

export function services(this: feathers.Application) {
  const app = this;
  app.configure(users); 
};
