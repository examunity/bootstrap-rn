import React from 'react';

type ToastContainerContextType = true;

const ToastContainerContext =
  React.createContext<ToastContainerContextType | null>(null);

ToastContainerContext.displayName = 'ToastContainerContext';

export default ToastContainerContext;
