# mobx-forms

A simple form manager for [React](https://facebook.github.io/react/) and [Mobx](https://github.com/mobxjs/mobx).

> Heavily inspired by and based on [Redux Form](https://github.com/erikras/redux-form)! Be sure to check it out if you're a Redux fan.

## ROADMAP

1. finish the api (mainly submitting/async validation)
2. tests!
3. docs!
4. better README :blush:

### Installation

`npm i --save mobx-forms`

### Usage

Use `Provider` from `mobx-react` and supply the form store to it as `mobxForms`.

```javascript
import { FormStore } from 'mobx-forms';
import { Provider } from 'mobx-react';

import YourApp from './YourApp';

const Root = () =>
  <Provider mobxForms={new FormStore()}>
    <YourApp>
  </Provider>;

export default Root;
```

Initializing a form:

```javascript

import { mobxForm, Field } from 'mobx-forms';

const YourApp = props =>
  <div>
    My field:
    <Field
      name="myField"
      component="input"
    />
  </div>;
  
export default mobxForm({
  form: 'myForm',
})(YourApp);
```

That's it! You will get the form's instance as a prop (with the name you supplied to the decorator, `myForm` in this case).

Field accepts either a *string* or a *component*. It will receive the necessary properties.
