import React, { PropsWithChildren, ReactElement, useState } from 'react';

import Modal from '@components/Modal';

import './style.scss';

interface TabbedPaneProps<T> {
  ariaLabel: string;
  closeTabLabel: string;
  currentTabIndex: number;
  newTabLabel: string;
  tabs: Array<ReactElement<T>>;
  addTab(): void;
  removeTab(index: number): void;
  setCurrentTab(index: number): void;
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const TabbedPane = <T,>({
  ariaLabel,
  currentTabIndex,
  tabs,
  newTabLabel,
  closeTabLabel,
  addTab,
  removeTab,
  setCurrentTab
}: PropsWithChildren<TabbedPaneProps<T>>) => {
  const [tabIndexToRemove, setTabIndexToRemove] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const confirmTabClosure = (index: number): void => {
    setTabIndexToRemove(index);
    setModalVisible(true);
  };

  const closeModal = (): void => {
    setTabIndexToRemove(-1);
    setModalVisible(false);
  };

  const doRemoveTab = (): void => {
    removeTab(tabIndexToRemove);
    closeModal();
  };

  return (
    <div className='tabbed-pane'>
      <div className='container mb-2'>
        <div role='tablist' aria-label={ariaLabel}>
          {tabs.map((tabItem, idx: number) => (
            <div
              key={tabItem.key}
              role='tab'
              id={`tab-${tabItem.key}`}
              aria-selected='true'
              aria-controls={`panel-${tabItem.key}`}
              tabIndex={idx === currentTabIndex ? 0 : 1}
              onClick={(): void => setCurrentTab(idx)}
            >
              <span>Query {tabItem.key}</span>
              <button className='danger close-tab' onClick={(): void => confirmTabClosure(idx)} title={closeTabLabel}>
                &#10799;
              </button>
            </div>
          ))}
          <button id='add-tab' onClick={addTab} title={newTabLabel}>
            [+]
          </button>
        </div>
      </div>
      {tabs.map((tabItem, idx: number) => (
        <div
          key={tabItem.key}
          role='tabpanel'
          id={`panel-${tabItem.key}`}
          tabIndex={0}
          aria-labelledby={`tab-${tabItem.key}`}
          hidden={idx !== currentTabIndex}
        >
          {tabItem}
        </div>
      ))}
      <Modal visible={modalVisible}>
        <div>Are you sure you want to close this query?</div>
        <div className='mt-2'>
          <button onClick={doRemoveTab} className='danger mr-2'>
            Yes
          </button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default TabbedPane;
