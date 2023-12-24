import React, { ChangeEvent, FunctionComponent, memo, useEffect, useState } from 'react';

import Modal from '@components/Modal';
import { DataSource, DbField } from '@utils/models';
import MockClient from '../../services/MockClient';

import './style.scss';

interface QueryAssistantProps {
  resetOnClose: boolean;
  visible: boolean;
  closeAssistant(): void;
  insertSql(sql: string): void;
}

const QueryAssistant: FunctionComponent<QueryAssistantProps> = ({
  resetOnClose,
  visible,
  closeAssistant,
  insertSql
}) => {
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);
  const [dataSourceFields, setDataSourceFields] = useState<(DbField & { isSelected: boolean })[]>([]);

  const areAllFieldsSelected = dataSourceFields.every((field) => field.isSelected);

  useEffect(() => {
    if (visible) {
      MockClient.getDataSources().then(setDataSources);
    } else {
      if (resetOnClose) {
        setDataSources([]);
        setSelectedDataSource(null);
      }
    }
  }, [visible]);

  useEffect(() => {
    if (selectedDataSource) {
      MockClient.getFields(selectedDataSource).then((fields) =>
        setDataSourceFields(
          Object.entries(fields).map((entry) => ({
            name: entry[0],
            dataType: entry[1].toLocaleLowerCase(),
            isSelected: false
          }))
        )
      );
    }
  }, [selectedDataSource]);

  const toggleAll = (e: ChangeEvent<HTMLInputElement>): void =>
    setDataSourceFields(dataSourceFields.map((field) => ({ ...field, isSelected: e.target.checked })));
  const toggleField = (index: number): void =>
    setDataSourceFields(
      dataSourceFields.map((field, idx) => (index === idx ? { ...field, isSelected: !field.isSelected } : field))
    );

  const generateQuery = (): void => {
    let fields = '*';

    if (!areAllFieldsSelected) {
      fields = dataSourceFields
        .filter((field) => field.isSelected)
        .map((field) => field.name)
        .join(', ');
    }

    insertSql(`SELECT ${fields} FROM ${selectedDataSource}`);
    closeAssistant();
  };

  return (
    <Modal visible={visible} width={360} id='query-assistant-modal'>
      <h2>Query Assistant</h2>
      <div id='datasource-selector' className='mb-2'>
        <label htmlFor='datasources-options'>Select DataSource</label>
        <select id='datasources-options' onChange={(e): void => setSelectedDataSource(DataSource[e.target.value])}>
          <option disabled selected>
            -- Select One --
          </option>
          {dataSources.map((dataSource, idx: number) => (
            <option key={idx} value={dataSource}>
              {dataSource.toLocaleLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <div className='mb-2'>
        {selectedDataSource ? (
          <>
            <label>Select Fields</label>
            <table>
              <thead>
                <tr>
                  <th>
                    <input type='checkbox' id='toggle-all' onChange={toggleAll} checked={areAllFieldsSelected} />
                    <label htmlFor='toggle-all'>Selected</label>
                  </th>
                  <th>Field Name</th>
                  <th>Field DataType</th>
                </tr>
              </thead>
              <tbody>
                {dataSourceFields.map((dbField, idx) => (
                  <tr key={dbField.name} onClick={(): void => toggleField(idx)}>
                    <td>
                      <input type='checkbox' checked={dbField.isSelected} onChange={(): void => toggleField(idx)} />
                    </td>
                    <td>
                      <pre>{dbField.name}</pre>
                    </td>
                    <td>
                      <pre>{dbField.dataType}</pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className='message danger'>No data-source selected yet!</div>
        )}
      </div>
      <div id='qa-footer'>
        <button onClick={generateQuery} className='primary mr-2'>
          Generate Query
        </button>
        <button onClick={closeAssistant}>Cancel</button>
      </div>
    </Modal>
  );
};

const bailOutFromReRendering = (prevProps: QueryAssistantProps, incomingProps: QueryAssistantProps): boolean =>
  !prevProps.visible && !incomingProps.visible;

export default memo(QueryAssistant, bailOutFromReRendering);
