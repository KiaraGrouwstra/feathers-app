import { models } from '../../models';
import { hooks } from './media.hooks';
import { filters } from './media.filters';

import * as multer from 'multer';
const multipartMiddleware = multer();
// Upload Service with multipart support

export const media = {
  factory: models.media,
  hooks,
  filters,
  middlewares: [
    // multer parses the file named 'uri'. Without extra params the data is temporarily kept in memory.
    multipartMiddleware.single('uri'),
    // another middleware, this time to transfer the received file to feathers
    function(req,res,next) {
      req.feathers.file = req.file;
      next();
    },
    blobService({Model: blobStorage}),
  ],
  // paginate: {},
};
