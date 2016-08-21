import React from 'react';

import { mobxForm, Field } from '../src';

const Form = () =>
  <div>
    <h2>My form:</h2>
    fist field
    <Field
      name="test"
      component="input"
    />
    second field
    <Field
      name="test2"
      component="input"
    />
  </div>;

export default mobxForm({
  form: 'first',
})(Form);
