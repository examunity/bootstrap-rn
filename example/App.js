import React from 'react';
import {
  Provider,
  Text,
  View,
  StyleSheet,
  css,
  Button,
  Colors,
} from 'bootstyle';
import COLORS from '../src/components/colors';

StyleSheet.build({});

const styles = StyleSheet.create({
  container: css`
    // test
    background-color: white;
    padding: 10px;

    // not working
    /* &:hover {
      background-color: green;

      @include media-breakpoint-between(md, xl) {
        background-color: blue;
      }
    }

    &:focus {
      background-color: orange;
    }

    @include media-breakpoint-between(md, xl) {
      background-color: blue;
    } */
  `,
});

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

function App() {
  return (
    <Provider ssrViewport="lg" breakpoints={breakpoints}>
      <View style={styles.container}>
        <Text>Anton</Text>

        <Button text="Primary" color={COLORS.PRIMARY} onPress={() => null} />
        <Button
          text="Secondary"
          color={COLORS.SECONDARY}
          onPress={() => null}
        />
        <Button text="Success" color={COLORS.SUCCESS} onPress={() => null} />
        <Button text="Danger" color={COLORS.DANGER} onPress={() => null} />
        <Button text="Warning" color={COLORS.WARNING} onPress={() => null} />
        <Button text="Info" color={COLORS.INFO} onPress={() => null} />
        <Button text="Light" color={COLORS.LIGHT} onPress={() => null} />
        <Button text="Dark" color={COLORS.DARK} onPress={() => null} />

        <Button text="classic primary" color="primary" onPress={() => null} />
        <Button text="classic warning" color="warning" onPress={() => null} />
        <Button text="clasic success" color="success" onPress={() => null} />

        <Button text="Default Outline" outline onPress={() => null} />

        <Button
          text="Secondary Large"
          size="large"
          color="secondary"
          onPress={() => null}
        />

        <Button
          text="Secondary Small Disabled"
          size="small"
          color="secondary"
          disabled
          onPress={() => null}
        />
      </View>
    </Provider>
  );
}

export default App;
