import * as R from 'ramda';
import * as feathers from 'feathers';
import * as NeDB from 'nedb';
import * as path from 'path';

// externalize `(app) =>`?
export const modelsFor: (obj: { [k: string]: { uniques: string[] } }) =>
    { [k: string]: (app: feathers.Application) => /*Model*/object } =
    R.map(({ uniques }) => (app: feathers.Application) => {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, `${name}.db`),
    autoload: true,
  });

  R.forEach((s: string) => Model.ensureIndex({ fieldName: s, unique: true }))(uniques);
  return Model;
});
