import { Dispatch, useReducer } from 'react';

import { initialState, QueryVisualiserState } from './state';
import { ActionEnums, Actions } from './actions';

const reducer = (state: QueryVisualiserState, action: Actions): QueryVisualiserState => {
  switch (action.type) {
    case ActionEnums.CLOSE_ASSISTANT_MODAL:
      return { ...state, assistanceModalVisible: false };
    case ActionEnums.CLOSE_HISTORY_MODAL:
      return { ...state, historyModalVisible: false };
    case ActionEnums.OPEN_ASSISTANT_MODAL:
      return { ...state, assistanceModalVisible: true };
    case ActionEnums.OPEN_HISTORY_MODAL:
      return { ...state, historyModalVisible: true };
    case ActionEnums.SET_ERROR:
      return { ...state, error: action.error };
    case ActionEnums.SET_QUERY:
      return { ...state, query: action.query };
    case ActionEnums.SET_RECORDS:
      return {
        ...state,
        records: action.records,
        history: state.history[0] !== state.query ? [state.query, ...state.history] : state.history,
        error: null
      };
    default:
      return state;
  }
};

const useQVReducer = (): [QueryVisualiserState, Dispatch<Actions>] => useReducer(reducer, initialState);

export default useQVReducer;
