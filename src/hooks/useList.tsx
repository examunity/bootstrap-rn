import React, { ReactNode } from 'react';
import ListContext from '../components/helpers/ListContext';

type Cache = {
  count: number;
};

const wrapChildren = (children: ReactNode, cache: Cache): ReactNode =>
  React.Children.map(children, (child) => {
    if (child === null) {
      return null;
    }

    if (React.isValidElement(child) && child.type === React.Fragment) {
      return (
        <React.Fragment key={child.key as React.Key}>
          {wrapChildren(child.props.children, cache)}
        </React.Fragment>
      );
    }

    if (React.isValidElement(child) && typeof child === 'object') {
      // eslint-disable-next-line no-param-reassign
      cache.count += 1;

      const pos = cache.count;

      return (
        <ListContext.Provider
          value={{
            nth(value: number) {
              return pos === value;
            },
            get first() {
              return pos === 1;
            },
            get last() {
              return pos === cache.count;
            },
            get length() {
              return cache.count;
            },
          }}
          key={child.key as React.Key}
        >
          {child}
        </ListContext.Provider>
      );
    }

    return null;
  });

export default function useList(children: ReactNode): ReactNode {
  return wrapChildren(children, { count: 0 });
}
