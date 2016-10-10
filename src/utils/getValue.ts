import { SynthEvent, Value } from './types';


type Target = HTMLInputElement | HTMLSelectElement;

const getSelectedValues = (options: HTMLOptionsCollection): string[] => Array.from(options)
    .filter(option => option.selected)
    .map(option => option.value);

const getValue = (ev: SynthEvent): Value => {
  const target = ev.target as Target;

  switch (target.type) {
    case 'checkbox':
      return (target as HTMLInputElement).checked;
    case 'file':
      return (target as HTMLInputElement).files;
    case 'select-multiple':
      return getSelectedValues((target as HTMLSelectElement).options);
    case 'range':
    case 'number':
      return Number(target.value);
    default:
      return target.value;
  }
};

export default getValue;
