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
      <Heading size={2}>Progress</Heading>
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

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

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
    </>
  );
}

export default SampleProgress;
