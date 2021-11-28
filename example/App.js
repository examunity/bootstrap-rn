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
    background-color: #f5f5f5;
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
        <Alert color="secondary">
          <Text>Markus</Text>
        </Alert>



        <Alert color="danger">
          <Text>Danger</Text>
        </Alert>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'row',
          }}
        >
          <Button
            color="primary"
            onPress={() => {
              // eslint-disable-next-line no-console
              console.log('pressed');
            }}
          >
            <Text>Buttontext</Text>
          </Button>
          <Button
            color="secondary"
            onPress={() => {
              // eslint-disable-next-line no-console
              console.log('pressed');
            }}
          >
            <Text>Buttontext</Text>
          </Button>
          <Button
            color="danger"
            onPress={() => {
              // eslint-disable-next-line no-console
              console.log('pressed');
            }}
          >
            <Text>Buttontext</Text>
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text>
            User Online: <Badge styleName="bg-primary">40</Badge>
          </Text>

          <Text>
            User Offline: <Badge styleName="bg-danger">40</Badge>
          </Text>

          <BsText h1>H1 Bootstrap Text H1</BsText>
          <BsText h2>H2 Bootstrap Text H2</BsText>
          <BsText h3>H3 Bootstrap Text H3</BsText>
          <BsText h4>H4 Bootstrap Text H4</BsText>
          <BsText h5>H5 Bootstrap Text H5</BsText>
          <BsText h6>H6 Bootstrap Text H6</BsText>

          
          <Card color="success">
            <Card.Header>
              <BsText h1>Card Header Text h1</BsText>
            </Card.Header>
            <Card.Body></Card.Body>
            <Card.Footer>
                <Alert color="dark">
                  <Text>Alert in Footer</Text>
                </Alert>
            </Card.Footer>
          </Card>

          <Card color="primary">
            <Card.Header>
              <BsText h4>Card Header Text Prime h4</BsText>
            </Card.Header>
            <Card.Body></Card.Body>
            <Card.Footer>
                <Alert color="dark">
                  <Text>Alert in Footer</Text>
                </Alert>
            </Card.Footer>
          </Card>

        </View>
      </View>
    </Provider>
  );
}

export default App;
