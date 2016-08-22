import React from 'react';

const Input = props =>
  <div>
    <div>Error: {String(props.meta.error)}</div>
    <div>Valid: {String(props.meta.valid)}</div>
    <div>Dirty: {String(props.meta.dirty)}</div>
    <div>Touched: {String(props.meta.touched)}</div>
    <div>Active: {String(props.meta.active)}</div>
    <input {...props.input} />
  </div>;

export default Input;
