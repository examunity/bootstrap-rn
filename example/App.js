import React from 'react';
import {
  Alert,
  Provider,
  Badge,
  BsText,
  Text,
  View,
  StyleSheet,
  css,
  Card,
  Progress,
  ScrollView,
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
  progressContainer: css`
    width: 500px;
    margin-vertical: 1rem;
  `,
  progress: css`
    height: 0.5rem;
    margin-bottom: 1rem;
  `,
});

function App() {
  return (
    <Provider ssrViewport="lg" breakpoints={breakpoints}>
      <ScrollView style={styles.container}>
        <Text styleName="bg-primary text-danger">Anton</Text>
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

          <Card>
            <Card.Header>
              <Text>Card Header Text</Text>
            </Card.Header>
            <Card.Body>
              <Text>Body Text</Text>
            </Card.Body>
            <Card.Footer>
              <Text>Card Footer Text</Text>
            </Card.Footer>
          </Card>

          <View style={styles.progressContainer}>
            <Progress min={10} max={50} style={styles.progress}>
              <Progress.Bar value={30} styleName="bg-danger" />
            </Progress>
            <Progress style={styles.progress}>
              <Progress.Bar value={30} styleName="bg-primary" />
              <Progress.Bar value={50} styleName="bg-info" />
            </Progress>
            <Progress>
              <Progress.Bar value={100} styleName="bg-success">
                100%
              </Progress.Bar>
            </Progress>
          </View>
        </View>
      </ScrollView>
    </Provider>
  );
}

export default App;
