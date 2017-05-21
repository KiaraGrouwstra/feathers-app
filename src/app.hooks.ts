import { HooksObject } from 'feathers-hooks';
const commonHooks: Hooks = require('feathers-hooks-common');
const { unless, remove, discard, populate, depopulate, getItems, replaceItems, iff, traverse } = commonHooks;
import { log } from './hooks/logger';

const trimmer = function (node) {
  if (typeof node === 'string') {
    this.update(node.trim());
  }
};

// REST HTTP request may use the string 'null' in its query string.
// Replace these strings with the value null.
const nuller = function (node) {
  if (node === 'null') { this.update(null); }
};

export const appHooks: HooksObject = {
  before: {
    all: [],
    find: [ traverse(nuller, hook => hook.params.query) ],
    get: [],
    create: [ remove('_id'), traverse(trimmer) ],
    update: [ remove('_id') ],
    patch: [ remove('_id') ],
    remove: [],
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
