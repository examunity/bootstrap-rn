import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import View from './View';
import { concatRefs } from '../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
};

const Heading = React.forwardRef((props, ref) => {
  const { children, htmlFor, ...elementProps } = props;

  // Ref: https://github.com/necolas/react-native-web/issues/1651
  const forRef = React.useCallback((node) => {
    if (Platform.OS !== 'web' || !htmlFor || !node) {
      return;
    }

    node.setAttribute('for', htmlFor);
  }, []);

  const role = Platform.OS === 'web' ? 'label' : null;

  return (
    <View
      {...elementProps}
      ref={concatRefs(forRef, ref)}
      accessibilityRole={role}
    >
      {children}
    </View>
  );
});

Heading.displayName = 'Heading';
Heading.propTypes = propTypes;

export default Heading;
