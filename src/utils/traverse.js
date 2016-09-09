import R from 'ramda';

export const nameIndex = part => ({
  name: R.match(/\w+/, part)[0],
  index: Number(R.match(/\d+/, part)[0]),
});

export function traverse(fields, context = '') {
  const path = context.split('.');
  const head = R.head(path);
  const tail = R.tail(path);

  const { name, index } = nameIndex(head);
  const field = R.path([name, index], fields);
  if (!field) {
    return null;
  }

  if (tail.length > 0) {
    return traverse(field, tail.join('.'));
  }

  return field;
}

export function traverseInit(fields, context = '') {
  const path = R.init(context.split('.')).join('.');

  if (path === '') {
    return null;
  }

  return traverse(fields, path);
}
