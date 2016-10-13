import * as React from 'react';

export type Target = HTMLInputElement | HTMLSelectElement;

export type SynthEvent = React.SyntheticEvent<Target>;

export type Value = string | string[] | number | boolean | FileList | null;


const isEvent = (thing: any): thing is SynthEvent =>
    Boolean(thing && thing.preventDefault && thing.stopPropagation);

const getSelectedValues = (options: HTMLOptionsCollection): string[] => Array.from(options)
    .filter(option => option.selected)
    .map(option => option.value);

const getValue = (ev: any): Value => {
  if (!isEvent(ev)) {
    return ev;
  }

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
