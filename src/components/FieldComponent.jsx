import React, { PropTypes } from 'react';
import R from 'ramda';

import { separateProps } from '../utils/helpers';

const FieldComponent = ({ component, ...props }) => {
  const { input, meta, custom } = separateProps(props);

  if (typeof component === 'string') {
    return React.createElement(component, R.merge(input, custom));
  }

  return (
    <component
      {...custom}
      input={input}
      meta={meta}
    />
  );
};

FieldComponent.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
};

export default FieldComponent;
