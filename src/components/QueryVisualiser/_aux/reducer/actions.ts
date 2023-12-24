import { QueryVisualiserState } from './state';

export const enum ActionEnums {
  CLOSE_ASSISTANT_MODAL,
  CLOSE_HISTORY_MODAL,
  OPEN_ASSISTANT_MODAL,
  OPEN_HISTORY_MODAL,
  SET_ERROR,
  SET_QUERY,
  SET_RECORDS
}

export type Actions =
  | { type: ActionEnums.CLOSE_ASSISTANT_MODAL }
  | { type: ActionEnums.CLOSE_HISTORY_MODAL }
  | { type: ActionEnums.OPEN_HISTORY_MODAL }
  | { type: ActionEnums.OPEN_ASSISTANT_MODAL }
  | { type: ActionEnums.SET_ERROR; error: QueryVisualiserState['error'] }
  | { type: ActionEnums.SET_QUERY; query: QueryVisualiserState['query'] }
  | { type: ActionEnums.SET_RECORDS; records: QueryVisualiserState['records'] };
