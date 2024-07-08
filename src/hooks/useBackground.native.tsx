import React from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import type { BaseStyle, PlacementAxis } from '../types';

type BackgroundSize = 'cover' | 'contain' | { width: number; height: number };

type BackgroundResult = {
  containerStyle: BaseStyle;
  objectStyle: BaseStyle;
  xml: string | null;
};

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  object: { aspectRatio: 1 },
});

const horizontalPositions = {
  left: (offset: number = 0) => ({
    alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    paddingLeft: offset,
  }),
  right: (offset: number = 0) => ({
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    paddingRight: offset,
  }),
  center: (offset?: number) => {
    if (offset !== undefined) {
      return null;
    }

    return {
      alignItems: 'center',
    };
  },
  top: undefined,
  bottom: undefined,
};

const verticalPositions = {
  top: (offset: number = 0) => ({
    justifyContent: 'flex-start',
    paddingTop: offset,
  }),
  bottom: (offset: number = 0) => ({
    justifyContent: 'flex-end',
    paddingBottom: offset,
  }),
  center: (offset?: number) => {
    if (offset !== undefined) {
      return null;
    }

    return {
      justifyContent: 'center',
    };
  },
  left: undefined,
  right: undefined,
};

const getXml = (value: string) => {
  const match = value.match(/^url\("data:image\/svg\+xml,(.*?)"\)$/);

  if (!match) {
    return null;
  }

  return decodeURIComponent(match[1]);
};

const transforms = {
  backgroundSize(value: BackgroundSize) {
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
  backgroundPosition(value: PlacementAxis) {
    if (value === 'center') {
      return {
        alignItems: 'center',
        justifyContent: 'center',
      };
    }

    const horizontalPosition = horizontalPositions[value];

    if (horizontalPosition !== undefined) {
      return {
        ...horizontalPosition(),
        justifyContent: 'center',
      };
    }

    const verticalPosition = verticalPositions[value];

    if (verticalPosition) {
      return {
        alignItems: 'center',
        ...verticalPosition(),
      };
    }

    return null;
  },
  backgroundPositionX(
    value: PlacementAxis | { position: PlacementAxis; offset: number },
  ) {
    const { position = 'left', offset } =
      typeof value === 'object'
        ? value
        : { position: value, offset: undefined };

    const horizontalPosition = horizontalPositions[position];

    if (!horizontalPosition) {
      return null;
    }

    return horizontalPosition(offset);
  },
  backgroundPositionY(
    value: PlacementAxis | { position: PlacementAxis; offset: number },
  ) {
    const { position = 'top', offset } =
      typeof value === 'object'
        ? value
        : { position: value, offset: undefined };

    const verticalPosition = horizontalPositions[position];

    if (!verticalPosition) {
      return null;
    }

    return verticalPosition(offset);
  },
};

export default function useBackground(style: BaseStyle[]) {
  const flattenedStyle = StyleSheet.flatten(style);

  const background: BackgroundResult = {
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
