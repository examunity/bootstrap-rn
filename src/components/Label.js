import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import View from './View';
import { concatRefs } from '../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
};

const Label = React.forwardRef((props, ref) => {
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
    <View {...elementProps} ref={concatRefs(forRef, ref)} role={role}>
      {children}
    </View>
  );
});

Label.displayName = 'Label';
Label.propTypes = propTypes;

export default Label;
