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
    setTabs([...tabs, <QueryVisualiser key={newTabCounter} />]);
  };
  const removeTab = (index: number): void => setTabs(tabs.filter((_, idx: number) => idx !== index));

  return (
    <>
      <h1>SQL Query Executor</h1>
      <TabbedPane<QueryVisualiserProps>
        ariaLabel='Query runner tabs'
        currentTabIndex={currentTab}
        tabs={tabs}
        setCurrentTab={setCurrentTab}
        addTab={addTab}
        removeTab={removeTab}
      />
    </>
  );
};

export default App;
