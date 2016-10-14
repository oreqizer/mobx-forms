/// <reference types="jest" />

/* eslint-disable react/prop-types */
import getValue from '../getValue';

const preventDefault = (id: any) => id;
const stopPropagation = (id: any) => id;

const evValue = (value: any) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'text',
    value,
  },
});

const evChecked = (checked: boolean) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'checkbox',
    checked,
  },
});

const evFiles = (files: string[]) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'file',
    files,
  },
});

const evSelect = (options: Object[]) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'select-multiple',
    options,
  },
});

const evNumber = (value: number) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'number',
    value,
  },
});

const evRange = (value: number) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'range',
    value,
  },
});

describe('#getValue', () => {
  it('should return value for non-event values', () => {
    expect(getValue(undefined)).toBeUndefined();
    expect(getValue(null)).toBeNull();
    expect(getValue(1337)).toBe(1337);
    expect(getValue(true)).toBe(true);
    expect(getValue(false)).toBe(false);
  });

  it('should return value for value', () => {
    expect(getValue(evValue(null))).toBeNull();
    expect(getValue(evValue(undefined))).toBeUndefined();
    expect(getValue(evValue(1337))).toBe(1337);
    expect(getValue(evValue('y u do dis'))).toBe('y u do dis');
  });

  it('should return checked for checkbox', () => {
    expect(getValue(evChecked(true))).toBe(true);
    expect(getValue(evChecked(false))).toBe(false);
  });

  it('should return files for files', () => {
    const files = ['lol', 'kek', 'bur'];
    expect(getValue(evFiles(files))).toEqual(files);
  });

  it('should return options for select-multiple', () => {
    const options = [
      { selected: false, value: 'lol' },
      { selected: true, value: 'kek' },
      { selected: false, value: 'bur' },
    ];
    expect(getValue(evSelect(options))).toEqual(['kek']);
    expect(getValue(evSelect([]))).toEqual([]);
  });

  it('should return numbers for number or range', () => {
    expect(getValue(evNumber(13.37))).toBe(13.37);
    expect(getValue(evRange(13.37))).toBe(13.37);
  });
});
