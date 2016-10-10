import * as R from 'ramda';

import { FormObject, FormArray } from './types';

type Form = FormObject | FormArray;

function maybeHash(form: Form, path: string): Form | null {
  const [name, index] = path.split('#');

  return index ? R.path<Form>([name, index], form) : R.prop<Form>(name, form);
}

export default function traverse(form: Form, context: string): Form {
  if (context === '') {
    return form;
  }

  const path = context.split('.');
  const head = R.head(path);
  const tail = R.tail(path);

  const fields = maybeHash(form, head);
  if (!fields) {
    return form;
  }

  if (tail.length > 0) {
    return traverse(fields, tail.join('.'));
  }

  return fields;
}
