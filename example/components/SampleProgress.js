import React from 'react';
import {
  Progress,
  View,
  Text,
  Heading,
  StyleSheet,
  css,
  Container,
  Row,
  Col,
  Code,
  Card,
} from 'bootstrap-rn';

const styles = StyleSheet.create({
  progressContainer: css`
    width: 200px;
    margin-vertical: 1rem;
  `,
  progress: css`
    height: 0.5rem;
    margin-bottom: 1rem;
  `,
});
const exampleCode =
  '<>\n' +
  '<View style={styles.progressContainer}>\n' +
  ' <Progress min={10} max={50} style={styles.progress}>\n' +
  '   <Progress.Bar value={30} styleName="bg-danger" />\n' +
  ' </Progress>\n' +
  ' <Progress style={styles.progress}>\n' +
  '   <Progress.Bar value={30} styleName="bg-primary" />\n' +
  '    <Progress.Bar value={50} styleName="bg-info" />\n' +
  ' </Progress>\n' +
  ' <Progress>\n' +
  '   <Progress.Bar value={100} styleName="bg-success">\n' +
  '      100%\n' +
  '   </Progress.Bar>\n' +
  ' </Progress>\n' +
  '</View>\n' +
  '</>';

function SampleProgress() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Progress</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Progress </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
        </Row>
      </Container>
      {/* PROPS -----------------------------------------------------  */}
      <Container styleName="mb-5">
        <Row styleName="bg-secondary">
          <Col size={6}>
            <Text>Propname</Text>
          </Col>
          <Col size={6}>
            <Text>Value</Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>min</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.number</Text>
          </Col>
        </Row>
        <Row>
          <Col size={6}>
            <Text>max</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.number</Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>value</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.number.isRequired</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Progress</Heading>
        </Card.Header>
        <Card.Body>
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
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleProgress;
