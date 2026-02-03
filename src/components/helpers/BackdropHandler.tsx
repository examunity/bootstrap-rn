import React from 'react';
import { StyleSheet } from 'react-native';
import Pressable from '../Pressable';

type BackdropType = boolean | 'static';

interface BackdropHandlerProps {
  onClose?: () => void;
  backdrop?: BackdropType;
}

function BackdropHandler(props: BackdropHandlerProps) {
  const { onClose: handleClose, backdrop = true } = props;

  if (backdrop !== true) {
    return null;
  }

  return (
    <Pressable
      style={[StyleSheet.absoluteFill, { flexGrow: 1 }]}
      onPress={() => {
        handleClose?.();
      }}
      accessible={false}
      importantForAccessibility="no"
    />
  );
}

export default BackdropHandler;
