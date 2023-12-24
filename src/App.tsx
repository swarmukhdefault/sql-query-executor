import React, { FunctionComponent, ReactElement, useState } from 'react';

import TabbedPane from '@components/TabbedPane';
import QueryVisualiser, { QueryVisualiserProps } from '@components/QueryVisualiser';

import '@assets/styles/App.scss';

const App: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [tabCounter, setTabCounter] = useState(1);
  const [tabs, setTabs] = useState<ReactElement<QueryVisualiserProps>[]>([<QueryVisualiser key={tabCounter} />]);

  const addTab = (): void => {
    const newTabCounter = tabCounter + 1;

    setTabCounter(newTabCounter);
    setTabs((currentTabs) => [...currentTabs, <QueryVisualiser key={newTabCounter} />]);
  };
  const removeTab = (index: number): void => {
    const newTabList = tabs.filter((_, idx: number) => idx !== index);

    if (newTabList.length === 0) {
      setTabs([]);
      addTab();
    } else {
      setTabs(newTabList);
    }
  };

  return (
    <>
      <h1>SQL Query Executor</h1>
      <TabbedPane<QueryVisualiserProps>
        ariaLabel='Query runner tabs'
        currentTabIndex={currentTab}
        newTabLabel='New Query'
        closeTabLabel='Close Query'
        tabs={tabs}
        setCurrentTab={setCurrentTab}
        addTab={addTab}
        removeTab={removeTab}
      />
    </>
  );
};

export default App;
