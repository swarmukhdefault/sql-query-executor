import React, { ChangeEvent, FunctionComponent } from 'react';

import MessageBox from '@components/MessageBox';
import Modal from '@components/Modal';
import QueryAssistant from '@components/QueryAssistant';

import MockClient from '@services/MockClient';
import { copyTextToClipboard, sqlQueryParser } from '@utils/helpers';

import useQVReducer from './_aux/reducer';
import { ActionEnums } from './_aux/reducer/actions';

import './style.scss';

export interface QueryVisualiserProps {}

const QueryVisualiser: FunctionComponent<QueryVisualiserProps> = () => {
  const [state, dispatch] = useQVReducer();

  const updateQuery = (e: ChangeEvent<HTMLTextAreaElement>): void =>
    dispatch({ type: ActionEnums.SET_QUERY, query: e.target.value });

  const doExecuteQuery = (): void => {
    try {
      const p = sqlQueryParser(state.query);

      MockClient.getRecords(p.dataSource, p.fields)
        .then((r) => {
          dispatch({ type: ActionEnums.SET_RECORDS, records: r });
        })
        .catch((e) => dispatch({ type: ActionEnums.SET_ERROR, error: e.message }));
    } catch (e) {
      dispatch({ type: ActionEnums.SET_ERROR, error: e.message });
    }
  };

  return (
    <div className='query-visualiser'>
      <div>
        <div id='query-input-form'>
          <label htmlFor='input-query'>Query (case-insensitive)</label>
          <textarea id='input-query' onChange={updateQuery} value={state.query} />
        </div>
        <div id='control-plane' className='mt-2 mb-2'>
          <div>
            <button onClick={doExecuteQuery} className='primary mr-2'>
              Execute Query
            </button>
            <button onClick={(): void => dispatch({ type: ActionEnums.OPEN_ASSISTANT_MODAL })}>Get Assistance</button>
          </div>
          <button onClick={(): void => dispatch({ type: ActionEnums.OPEN_HISTORY_MODAL })}>
            History ({state.history.length})
          </button>
        </div>
      </div>
      {state.error && <MessageBox variant='error' title='Error' message={<span>{state.error}</span>} />}
      <div className='container'>
        {state.records.length === 0 ? (
          <div>No data!</div>
        ) : (
          <table>
            <thead>
              <tr>
                {Object.keys(state.records[0]).map((key: string, idx: number) => (
                  <th key={idx}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.records.map((record, idx: number) => (
                <tr key={idx}>
                  {Object.values(record).map((value: unknown, idx2: number) => (
                    <td key={idx2}>{value as string}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <QueryAssistant
        resetOnClose={false}
        visible={state.assistanceModalVisible}
        closeAssistant={(): void => dispatch({ type: ActionEnums.CLOSE_ASSISTANT_MODAL })}
        insertSql={(sql: string): void => dispatch({ type: ActionEnums.SET_QUERY, query: sql })}
      />
      <Modal visible={state.historyModalVisible} width={360} id='history-modal'>
        <hgroup>
          <h2>History</h2>
          <h4>Ordering: Latest to oldest</h4>
          <h5>Click on an entry to copy</h5>
        </hgroup>
        <ol>
          {state.history.map((sqlQuery, idx) => (
            <li key={idx} title='Click to copy' onClick={(): void => copyTextToClipboard(sqlQuery)}>
              <pre>{sqlQuery}</pre>
            </li>
          ))}
        </ol>
        <div id='history-footer'>
          <button onClick={(): void => dispatch({ type: ActionEnums.CLOSE_HISTORY_MODAL })}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default QueryVisualiser;
