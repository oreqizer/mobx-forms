import React from 'react';
import { mobxForm, Field } from 'mobx-forms';

const Form = props =>
  <div>
    <h2>My form 2 (native inputs):</h2>
    input
    <Field
      name="test"
      component="input"
    />
    textarea
    <Field
      name="test2"
      component="textarea"
    />
    checkbox
    <Field
      name="test3"
      component="input"
      type="checkbox"
    />
    <div>---</div>
    <button onClick={() => console.log(props.second.values)}>
      values -> console
    </button>
  </div>;

export default mobxForm({
  form: 'second',
})(Form);
