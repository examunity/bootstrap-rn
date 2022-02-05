import React from 'react';
import { Progress, View, Heading, StyleSheet, css } from 'bootstrap-rn';

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
    </>
  );
}

export default SampleProgress;
