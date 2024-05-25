import PropTypes from 'prop-types';
import useToggleDropdown from './useToggleDropdown';

const propTypes = {
  children: PropTypes.func.isRequired,
};

function DropdownToggle(props) {
  const { children } = props;

  return children(useToggleDropdown({}));
}

DropdownToggle.displayName = 'DropdownToggle';
DropdownToggle.propTypes = propTypes;

export default DropdownToggle;
