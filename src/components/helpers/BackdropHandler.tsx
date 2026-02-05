import React from 'react';
import { StyleSheet } from 'react-native';
import Pressable from '../Pressable';

interface BackdropHandlerProps {
  onClose?: () => void;
  backdrop?: boolean | 'static';
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
