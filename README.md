# mobx-forms

A simple form manager for [React](https://facebook.github.io/react/) and [Mobx](https://github.com/mobxjs/mobx).

> Heavily inspired by and based on [Redux Form](https://github.com/erikras/redux-form)! Be sure to check it out if you're a Redux fan.

## TODO

- [ ] namespace types
- [ ] add docs

## ROADMAP

1. finish the api (mainly submitting/async validation)
4. better README :blush:

### Installation

`npm i --save mobx-forms`

### Usage

Use `Provider` from `mobx-react` and supply the form store to it as `mobxForms`.

```javascript
import { FormsStore } from 'mobx-forms';
import { Provider } from 'mobx-react';

import YourApp from './YourApp';

const Root = () =>
  <Provider mobxForms={new FormsStore()}>
    <YourApp>
  </Provider>;

export default Root;
```

Initializing a form:

```javascript
import React from 'react';
import { observer } from 'mobx-react';

import { mobxForm, Field, FieldArray } from 'mobx-forms';

const Form = props => (
  <div>
    My field:
    <Field
      name="myField"
      component={Input}
    />
    My flat array:
    <FieldArray
      name="flatarray"
      component={FlatArray}
      flat
    />
    My multi-field array:
    <FieldArray
      name="deeparray"
      component={DeepArray}
    />
  </div>
);

export default mobxForm({
  form: 'myForm',
})(Form);
```
 
Example of a `FlatArray` and `DeepArray`:

```javascript
const FlatArray = observer(props =>
  <div>
    {props.fields.map((index) =>
      <Field
        name="flatfield"
        key={index}
        index={index}
        component="input"
      />
    )}
    <button onClick={props.fields.push}>
      Add field
    </button>
    <button onClick={props.fields.pop}>
      Remove field
    </button>
  </div>
);

const DeepArray = observer(props =>
  <div>
    {props.fields.map(index =>
      <div key={index}>
        name:
        <Field
          name="name"
          index={index}
          component={Input}
        />
        surname:
        <Field
          name="surname"
          index={index}
          component="input"
        />
      </div>
    )}
    <button onClick={props.fields.push}>
      Add fields
    </button>
    <button onClick={props.fields.pop}>
      Remove fields
    </button>
  </div>
);
```

That's it! You will get the form's instance as a prop named `form`.

`Field` accepts either a *string* or a *component*. It will receive the necessary properties. More detailed docs incoming.
