const getSelectedValues = (options = []) => options
    .filter(option => option.selected)
    .map(option => option.value);

const isEvent = ev => Boolean(ev && ev.preventDefault && ev.stopPropagation);

const getValue = ev => {
  if (!isEvent(ev)) {
    return ev;
  }

  const {
    target: { type, value, checked, files, options },
    dataTransfer,
  } = ev;

  switch (type) {
    case 'checkbox':
      return checked;
    case 'file':
      return files || (dataTransfer && dataTransfer.files);
    case 'select-multiple':
      return getSelectedValues(options);
    case 'range':
    case 'number':
      return Number(value);
    default:
      return value;
  }
};

export default getValue;
