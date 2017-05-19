import * as logger from 'winston';
import { HookProps } from 'feathers-hooks';

export function log() {
  return function (hook: HookProps<any> & { path: string, error: Error }) {
    let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

    if (hook.type === 'error') {
      message += `: ${hook.error.message}`;
    }

    logger.info(message);
    logger.debug('hook.data', hook.data);
    logger.debug('hook.params', hook.params);

    if (hook.result) {
      logger.debug('hook.result', hook.result);
    }

    if (hook.error) {
      logger.error(hook.error.message);
    }
  };
};
