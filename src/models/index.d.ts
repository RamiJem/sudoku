import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SudokuMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Sudoku {
  readonly id: string;
  readonly puzzle?: string;
  readonly solution?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Sudoku, SudokuMetaData>);
  static copyOf(source: Sudoku, mutator: (draft: MutableModel<Sudoku, SudokuMetaData>) => MutableModel<Sudoku, SudokuMetaData> | void): Sudoku;
}