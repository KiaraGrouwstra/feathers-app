import * as feathers from 'feathers';
import * as NeDB from 'nedb';
import * as path from 'path';

export function createModel(app: feathers.Application) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'users.db'),
    autoload: true,
  });

  Model.ensureIndex({ fieldName: 'email', unique: true }); 
  return Model;
};
