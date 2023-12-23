import React, { PropsWithChildren, ReactElement } from 'react';

import './style.scss';

interface TabbedPaneProps<T> {
  ariaLabel: string;
  currentTabIndex: number;
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
  addTab,
  removeTab,
  setCurrentTab
}: PropsWithChildren<TabbedPaneProps<T>>) => (
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
            <span>Query {Number(tabItem.key) + 1}</span>
            <button className='close-tab' onClick={(): void => removeTab(idx)}>
              &#10799;
            </button>
          </div>
        ))}
        <button id='add-tab' onClick={addTab} title='New Query'>
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
  </div>
);

export default TabbedPane;
