import React from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

// The assumed background styles are typed as followed:
//
// type Position = 'center' | 'left' | 'right' | 'top' | 'bottom';
// type PositionX = 'center' | 'left' | 'right';
// type PositionY = 'center' | 'top' | 'bottom';
//
// type BackgroundStyles = {
//   backgroundImage: string,
//   backgroundSize: 'contain' | 'cover' | string | number,
//   backgroundPosition: Position,
//   backgroundPositionX:
//     | PositionX
//     | { position: PositionX, offset: string | number },
//   backgroundPositionY:
//     | PositionY
//     | { position: PositionY, offset: string | number },
// };

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  object: { aspectRatio: 1 },
});

const horizontalPositions = {
  left: (offset = 0) => ({
    alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    paddingLeft: offset,
  }),
  right: (offset = 0) => ({
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    paddingRight: offset,
  }),
  center: (offset) => {
    if (offset !== undefined) {
      return null;
    }

    return {
      alignItems: 'center',
    };
  },
};

const verticalPositions = {
  top: (offset = 0) => ({
    justifyContent: 'flex-start',
    paddingTop: offset,
  }),
  bottom: (offset = 0) => ({
    justifyContent: 'flex-end',
    paddingBottom: offset,
  }),
  center: (offset) => {
    if (offset !== undefined) {
      return null;
    }

    return {
      justifyContent: 'center',
    };
  },
};

const getXml = (value) => {
  const match = value.match(/^url\("data:image\/svg\+xml,(.*?)"\)$/);

  if (!match) {
    return null;
  }

  return decodeURIComponent(match[1]);
};

const transforms = {
  backgroundSize(value) {
    if (value === 'cover') {
      return {
        width: '100%',
        // TODO: Support cover for views with height > width.
        // height: '100%',
      };
    }

    if (value === 'contain') {
      return {
        width: '100%',
        height: '100%',
      };
    }

    const { width, height = width } = value;

    return {
      width,
      height,
    };
  },
  backgroundPosition(value) {
    if (value === 'center') {
      return {
        alignItems: 'center',
        justifyContent: 'center',
      };
    }

    if (horizontalPositions[value]) {
      return {
        ...horizontalPositions[value](),
        justifyContent: 'center',
      };
    }

    if (verticalPositions[value]) {
      return {
        alignItems: 'center',
        ...verticalPositions[value](),
      };
    }

    return null;
  },
  backgroundPositionX(value) {
    const { position = 'left', offset } =
      typeof value === 'object' ? value : { position: value };

    if (!horizontalPositions[position]) {
      return null;
    }

    return horizontalPositions[position](offset);
  },
  backgroundPositionY(value) {
    const { position = 'top', offset } =
      typeof value === 'object' ? value : { position: value };

    if (!verticalPositions[position]) {
      return null;
    }

    return verticalPositions[position](offset);
  },
};

export default function useBackground(style) {
  const flattenedStyle = StyleSheet.flatten(style);

  const background = {
    containerStyle: {},
    objectStyle: {},
    xml: null,
  };

  Object.entries(flattenedStyle).forEach(([key, value]) => {
    if (!value) {
      return;
    }

    if (key === 'backgroundImage') {
      background.xml = getXml(value);
    } else if (key === 'backgroundSize') {
      Object.assign(background.objectStyle, transforms[key](value));
    } else if (
      key === 'backgroundPosition' ||
      key === 'backgroundPositionX' ||
      key === 'backgroundPositionY'
    ) {
      Object.assign(background.containerStyle, transforms[key](value));
    }
  });

  return {
    style: flattenedStyle,
    element: (
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.container,
          background.containerStyle,
        ]}
      >
        <View style={[styles.object, background.objectStyle]}>
          {background.xml && <SvgXml xml={background.xml} />}
        </View>
      </View>
    ),
  };
}
