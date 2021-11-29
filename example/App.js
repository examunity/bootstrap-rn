import React from 'react';
import {
  Alert,
  Provider,
  Button,
  Badge,
  BsText,
  Text,
  View,
  StyleSheet,
  css,
  Card,
  Progress,
} from 'bootstyle';

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

StyleSheet.build();

const styles = StyleSheet.create({
  container: css`
    background-color: #fff;
  `,
});

function App() {
  return (
    <Provider ssrViewport="lg" breakpoints={breakpoints}>
      <View style={styles.container}>
        <Text>Anton</Text>
        <Alert color="primary">
          <Text>Patrik</Text>
        </Alert>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text>
            User Online: <Badge styleName="bg-primary">40</Badge>
          </Text>

          <BsText h1>H1 Bootstrap Text H1</BsText>
          <BsText h2>H2 Bootstrap Text H2</BsText>
          <BsText h3>H3 Bootstrap Text H3</BsText>
          <BsText h4>H4 Bootstrap Text H4</BsText>
          <BsText h5>H5 Bootstrap Text H5</BsText>
          <BsText h6>H6 Bootstrap Text H6</BsText>

          <Card >
            <Card.Header>
              <BsText h4>Card Header Text Prime h4</BsText>
            </Card.Header>
            <Card.Body>Body Text</Card.Body>
            <Card.Footer>
              <BsText h4>Card Footer Text  h4</BsText>
              <Progress>
                <Progress.Bar value={80}></Progress.Bar>
              </Progress>
            </Card.Footer>
          </Card>

          <View style={{ width: 600, height: 30, marginTop: 20 }}>
            <Progress>
              <Progress.Bar value={40} color="danger"></Progress.Bar>
            </Progress>
          </View>

          <View style={{ width: 600, height: 30 }}>
            <Progress>
              <Progress.Bar value={100} color="success">100%</Progress.Bar>
            </Progress>
          </View>

          <View style={{ width: 600, height: 30 }}>
            <Progress>
              <Progress.Bar value={70} color="info"></Progress.Bar>
            </Progress>
          </View>

        </View>
      </View>
    </Provider>
  );
}

export default App;
