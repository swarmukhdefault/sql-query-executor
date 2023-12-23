import React, { ChangeEvent, FunctionComponent, useState } from 'react';

import { stringQueryParser } from '@utils/helpers';
import MockServer from '@services/MockServer';

import '@assets/styles/App.scss';

const App: FunctionComponent = () => {
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState([]);

  const updateQuery = (e: ChangeEvent<HTMLTextAreaElement>): void => setQuery(e.target.value);

  const doExecuteQuery = (): void => {
    try {
      const p = stringQueryParser(query);
      MockServer.getRecords(p.dataSource, p.fields).then(setRecords);
    } catch (e) {
      // TODO: display error
    }
  };

  return (
    <>
      <h1>SQL Query Executor</h1>
      <div>
        <div id='query-input-form'>
          <label htmlFor='input-query'>Query (case-insensitive)</label>
          <textarea id='input-query' onChange={updateQuery}>
            {query}
          </textarea>
        </div>
        <button onClick={doExecuteQuery}>Execute</button>
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
                  {Object.values(record).map((value: any, idx2: number) => (
                    <td key={idx2}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default App;
