import React from 'react';

import { mobxForm, Field } from '../src';

const Form = () =>
  <div>
    my form:
    <Field
      name="test"
      component="input"
    />
  </div>;

export default mobxForm({
  form: 'first',
})(Form);
