import React from 'react';

type ToastContainerContextType = unknown;

const ToastContainerContext =
  React.createContext<ToastContainerContextType | null>(null);

ToastContainerContext.displayName = 'ToastContainerContext';

export default ToastContainerContext;
