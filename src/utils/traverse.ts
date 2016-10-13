import * as R from 'ramda';

import { FormElement } from './types';

function maybeHash(form: FormElement, path: string): FormElement | null {
  const [name, index] = path.split('#');

  return index
      ? R.path<FormElement>([name, index], form)
      : R.prop<FormElement>(name, form);
}

export default function traverse(
    form: FormElement, context: string
): FormElement | null {
  if (context === '') {
    return form;
  }

  const path = context.split('.');
  const head = R.head(path);
  const tail = R.tail(path);

  const fields = maybeHash(form, head);
  if (!fields) {
    return null;
  }

  if (tail.length > 0) {
    return traverse(fields, tail.join('.'));
  }

  return fields;
}
