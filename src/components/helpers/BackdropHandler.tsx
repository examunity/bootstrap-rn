import React from 'react';
import { Platform } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';

type BackdropType = boolean | 'static';

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

interface BackdropHandlerProps {
  onClose?: () => void;
  backdrop?: BackdropType;
}

function BackdropHandler(props: BackdropHandlerProps) {
  const { onClose: handleClose, backdrop = true } = props;

  if (Platform.OS === 'web' || backdrop !== true) {
    return null;
  }

  return (
    <Pressable
      style={styles.handler}
      onPress={() => {
        handleClose?.();
      }}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}

BackdropHandler.displayName = 'BackdropHandler';

export default BackdropHandler;
