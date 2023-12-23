import React, { FunctionComponent } from 'react';

import './style.scss';

const FeatureToggle: FunctionComponent = () => (
  <div id='feature-toggles-control'>
    <h3>Feature Toggle</h3>
    <dl id='features'>
      <dt>
        <label htmlFor='feature-1'>Feature 1</label>
      </dt>
      <dd>
        <input id='feature-1' type='checkbox' />
      </dd>
      <dt>
        <label htmlFor='feature-2'>Feature 2</label>
      </dt>
      <dd>
        <input id='feature-2' type='checkbox' />
      </dd>
      <dt>
        <label htmlFor='feature-3'>Feature 3</label>
      </dt>
      <dd>
        <input id='feature-3' type='checkbox' />
      </dd>
    </dl>
  </div>
);

export default FeatureToggle;
