import React from 'react';
import { mobxForm, Field } from 'mobx-forms';

import Input from './Input';

const array = ['lol', 'kek', 'bur'];

const Form = props =>
  <div>
    <h2>My form:</h2>
    <h4>first field</h4>
    <Field
      id="test"
      defaultValue="default"
      component={Input}
    />
    <h4>second field</h4>
    <Field
      id="test2"
      validate={value => value.length < 5 ? 'too short' : null}
      placeholder="longer than 5 chars"
      component={Input}
    />
    <h4>field array:</h4>
    {array.map((word, i) =>
      <Field
        key={i}
        id={`array-${i}-${word}`}
        component={Input}
      />
    )}
    <div>---</div>
    <button onClick={() => console.log(props.first.values)}>
      values -> console
    </button>
    <button onClick={() => console.log(props.first.errors)}>
      errors -> console
    </button>
  </div>;

export default mobxForm({
  form: 'first',
})(Form);
