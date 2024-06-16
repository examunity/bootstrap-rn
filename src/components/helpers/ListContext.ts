import React from 'react';

type ListContextProps = {
  nth: (value: number) => boolean;
  first: boolean;
  last: boolean;
  length: number;
};

const ListContext = React.createContext<ListContextProps | null>(null);

ListContext.displayName = 'ListContext';

export default ListContext;
