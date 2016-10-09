import { PropTypes } from 'react';

import FormStore from '../containers/FormStore';

const contextShape = {
  context: PropTypes.string.isRequired,
  flatArray: PropTypes.bool.isRequired,
  form: PropTypes.instanceOf(FormStore).isRequired,
};

export default contextShape;
