import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { FormsStore } from '../src';
import Form from './Form';
import Form2 from './Form2';

const Root = () =>
  <Provider mobxForms={new FormsStore()}>
    <div>
      <Form />
      <Form2 />
    </div>
  </Provider>;

const node = document.getElementById('root'); // eslint-disable-line no-undef

ReactDOM.render(<Root />, node);
