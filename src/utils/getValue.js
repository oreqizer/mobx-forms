const getSelectedValues = (options = []) => options.map(options.value);

const getValue = ev => {
  const { target: { type, value, checked, files }, dataTransfer } = ev;

  switch (type) {
    case 'checkbox':
      return checked;
    case 'file':
      return files || (dataTransfer && dataTransfer.files);
    case 'select-multiple':
      return getSelectedValues(ev.target.options);
    case 'range':
    case 'number':
      return Number(value);
    default:
      return value;
  }
};

export default getValue;
