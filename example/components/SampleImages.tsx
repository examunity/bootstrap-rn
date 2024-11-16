import React from 'react';
import { Heading, View, Image, StyleSheet, css } from 'bootstrap-rn';

const styles = StyleSheet.create({
  photo: {
    width: 200,
    height: 200,
  },
  name: css`
    text-align: center;
    padding-vertical: 0.5rem;
  `,
  content: css`
    text-align: center;
  `,
});

function SampleImages() {
  const imageSource = {
    uri: 'https://www.examunity.com/img/member/authors.png',
  };
  return (
    <View styleName="ai-center jc-center">
      <Image
        source={imageSource}
        accessibilityLabel="Our team of authors"
        style={styles.photo}
      />
      <Heading size={3} style={styles.name}>
        John Doe
      </Heading>
      <Heading size={4} styleName="text-center" style={styles.content}>
        Title
      </Heading>
      <Heading size={5} styleName="text-center" style={styles.content}>
        Subtitle
      </Heading>
    </View>
  );
}

export default SampleImages;
