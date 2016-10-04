import { PropTypes } from 'react';

import FormStore from '../containers/FormStore';

const contextShape = {
  form: PropTypes.instanceOf(FormStore).isRequired,
  context: PropTypes.string.isRequired,
  flatArray: PropTypes.bool.isRequired,
};

export default contextShape;
