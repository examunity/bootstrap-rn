import React from 'react';
import {
  DisplayHeading,
  Heading,
  Link,
  Text,
  Code,
  Blockquote,
  Paragraph,
} from 'bootstyle';

function Content() {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <>
      <DisplayHeading size={3}>Display Heading</DisplayHeading>
      <Heading size={2}>Content</Heading>
      <Heading size={4}>Bootstrap Text H4</Heading>
      <Heading size={5}>Bootstrap Text H5</Heading>
      <Heading size={6}>Bootstrap Text H6</Heading>
      <Paragraph>
        This is a very long text lorem ipsum lorem ipsum lorem ipsum This is a
        very long text lorem ipsum lorem ipsum lorem ipsum This is a very long
        text lorem ipsum lorem ipsum lorem ipsum This is a very long text lorem
        ipsum lorem ipsum lorem ipsum{' '}
        <Link
          onPress={() => {
            // eslint-disable-next-line no-console
            console.log('pressed!');
          }}
        >
          This is a very long text lorem ipsum lorem ipsum lorem ipsum
        </Link>{' '}
        This is a very long text lorem ipsum lorem ipsum lorem ipsum This is a
        very long text lorem ipsum lorem ipsum lorem ipsum This is a very long
        text lorem ipsum lorem ipsum lorem ipsum
      </Paragraph>
      <Text small>Small text</Text>
      <Text mark>Marked text</Text>
      <Text bold>Bold text</Text>
      <Text italic>Italic text</Text>
      <Code>Code text</Code>
      <Blockquote>
        <Text>Blockquote</Text>
      </Blockquote>
    </>
  );
  /* eslint-enable */
}

export default Content;
