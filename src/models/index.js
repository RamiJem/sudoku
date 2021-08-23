// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Sudoku } = initSchema(schema);

export {
  Sudoku
};