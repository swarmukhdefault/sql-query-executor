import React, { ChangeEvent, FunctionComponent, useState } from 'react';

import MockClient from '@services/MockClient';
import { sqlQueryParser } from '@utils/helpers';

import './style.scss';

export interface QueryVisualiserProps {}

const QueryVisualiser: FunctionComponent<QueryVisualiserProps> = () => {
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState([]);

  const updateQuery = (e: ChangeEvent<HTMLTextAreaElement>): void => setQuery(e.target.value);

  const doExecuteQuery = (): void => {
    try {
      const p = sqlQueryParser(query);
      MockClient.getRecords(p.dataSource, p.fields).then(setRecords);
    } catch (e) {
      // TODO: display error
    }
  };

  return (
    <div className='query-visualiser'>
      <div>
        <div id='query-input-form'>
          <label htmlFor='input-query'>Query (case-insensitive)</label>
          <textarea id='input-query' onChange={updateQuery} value={query} />
        </div>
        <button onClick={doExecuteQuery} className='primary'>
          Execute Query
        </button>
      </div>
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
    </div>
  );
};

export default QueryVisualiser;
