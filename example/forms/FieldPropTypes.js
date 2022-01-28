import PropTypes from 'prop-types';

const FieldPropTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  info: PropTypes.string,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func,
  formatError: PropTypes.func,
  component: PropTypes.elementType,
};

export default FieldPropTypes;
