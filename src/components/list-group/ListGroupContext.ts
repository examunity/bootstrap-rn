import React from 'react';

interface ListGroupContextType {
  flush?: boolean;
}

const ListGroupContext = React.createContext<ListGroupContextType | null>(null);

ListGroupContext.displayName = 'ListGroupContext';

export default ListGroupContext;
