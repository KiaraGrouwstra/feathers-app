import { HookProps } from 'feathers-hooks';

// for socket events? so every user creation incl. pw would get send to everyone?
export function filters<T>(data: T, connection: any, hook: HookProps<T>): T {
  // return data;
  delete data.password;
  return connection.user ? data : false;
};
