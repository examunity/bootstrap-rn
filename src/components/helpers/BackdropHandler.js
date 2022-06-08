import React, { useEffect } from 'react';
import { Platform, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';

const propTypes = {
  dialogRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onClose: PropTypes.func,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
};

const styles = StyleSheet.create({
  handler: css`
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    flex-grow: 1;
  `,
});

const BackdropHandler = (props) => {
  const { dialogRef, onClose: handleClose, backdrop = true } = props;

  if (Platform.OS === 'web') {
    useEffect(() => {
      const onDocumentMouseDown = ({ target }) => {
        const element = findNodeHandle(dialogRef.current);
        const isInsidePress = target === element || element.contains(target);

        if (!isInsidePress) {
          handleClose();
        }
      };

      document.addEventListener('mousedown', onDocumentMouseDown);

      return () => {
        document.removeEventListener('mousedown', onDocumentMouseDown);
      };
    }, []);

    return null;
  }

  if (backdrop !== true) {
    return null;
  }

  return (
    <Pressable
      style={styles.handler}
      onPress={() => {
        handleClose();
      }}
      accessible={false}
      importantForAccessibility="no"
    />
  );
};

BackdropHandler.displayName = 'Backdrop';
BackdropHandler.propTypes = propTypes;

export default BackdropHandler;
