import React from 'react';

import { mobxForm, Field } from '../src';

const Form = () =>
  <div>
    <h2>My form 2 (native inputs):</h2>
    fist field
    <Field
      id="test"
      component="input"
    />
    second field
    <Field
      id="test2"
      component="input"
    />
  </div>;

export default mobxForm({
  form: 'second',
})(Form);
