export interface QueryVisualiserState {
  assistanceModalVisible: boolean;
  error: string | null;
  history: string[];
  historyModalVisible: boolean;
  query: string;
  records: Record<string, any>[];
}

export const initialState: QueryVisualiserState = {
  query: '',
  records: [],
  assistanceModalVisible: false,
  error: null,
  history: [],
  historyModalVisible: false
};
