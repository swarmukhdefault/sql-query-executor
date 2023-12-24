import React, { ChangeEvent, FunctionComponent, useState } from 'react';

import MessageBox from '@components/MessageBox';
import QueryAssistant from '@components/QueryAssistant';
import MockClient from '@services/MockClient';
import { sqlQueryParser } from '@utils/helpers';

import './style.scss';

export interface QueryVisualiserProps {}

const QueryVisualiser: FunctionComponent<QueryVisualiserProps> = () => {
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [assistanceModalVisible, setAssistanceModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateQuery = (e: ChangeEvent<HTMLTextAreaElement>): void => setQuery(e.target.value);

  const doExecuteQuery = (): void => {
    try {
      const p = sqlQueryParser(query);
      MockClient.getRecords(p.dataSource, p.fields)
        .then((r) => {
          setRecords(r);
          setError(null);
        })
        .catch((e) => setError(e.message));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className='query-visualiser'>
      <div>
        <div id='query-input-form'>
          <label htmlFor='input-query'>Query (case-insensitive)</label>
          <textarea id='input-query' onChange={updateQuery} value={query} />
        </div>
        <div className='mt-2 mb-2'>
          <button onClick={doExecuteQuery} className='primary mr-2'>
            Execute Query
          </button>
          <button onClick={(): void => setAssistanceModalVisible(true)}>Get Assistance</button>
        </div>
      </div>
      {error && <MessageBox variant='error' title='Error' message={<span>{error}</span>} />}
      <div className='container'>
        {records.length === 0 ? (
          <div>No data!</div>
        ) : (
          <table>
            <thead>
              <tr>
                {Object.keys(records[0]).map((key: string, idx: number) => (
                  <th key={idx}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, idx: number) => (
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
        resetOnClose
        visible={assistanceModalVisible}
        closeAssistant={(): void => setAssistanceModalVisible(false)}
        insertSql={(sql: string): void => setQuery(sql)}
      />
    </div>
  );
};

export default QueryVisualiser;
