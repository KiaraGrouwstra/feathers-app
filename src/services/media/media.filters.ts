import { HookProps } from 'feathers-hooks';

export function filters<T>(data: T, connection: any, hook: HookProps<T>): T {
  return data;
};
