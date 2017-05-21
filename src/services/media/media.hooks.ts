import { HooksObject, HookProps, Hook } from 'feathers-hooks';
const dauria = require('dauria');

// before-create Hook to get the file (if there is any) and turn it into a datauri,
// transparently getting feathers-blob to work with multipart file uploads
export const hooks: HooksObject = {
  before: {
    create: [
      (hook) => {
        if (!hook.data.uri && hook.params.file) {
          const file = hook.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          hook.data = { uri };
        }
      },
    ],
  },
};
