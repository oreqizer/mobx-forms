import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { FormsStore } from '../src';
import Form from './Form';

const Root = () =>
  <Provider mobxForms={new FormsStore()}>
    <Form />
  </Provider>;

const node = document.getElementById('root'); // eslint-disable-line no-undef

ReactDOM.render(<Root />, node);
