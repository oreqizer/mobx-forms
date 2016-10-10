import * as R from 'ramda';

function maybeHash(form: Object, path: string): Object | null {
  const [name, index] = path.split('#');

  return index ? R.path([name, index], form) : R.prop(name, form);
}

export default function traverse(form: Object, context: string): Object | null {
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
