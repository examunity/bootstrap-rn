import React from 'react';
import ListContext from '../components/helpers/ListContext';

const wrapChildren = (children, cache) =>
  React.Children.map(children, (child) => {
    if (child === null) {
      return null;
    }

    if (child.type === React.Fragment) {
      return (
        <React.Fragment key={child.key}>
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
            nth(value) {
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
          key={child.key}
        >
          {child}
        </ListContext.Provider>
      );
    }

    return null;
  });

export default function useList(children) {
  return wrapChildren(children, { count: 0 });
}
