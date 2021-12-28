import React from 'react';
import { Heading, Text } from 'bootstyle';

function Content() {
  return (
    <>
      <Heading size={2}>Content</Heading>
      <Heading size={4}>Bootstrap Text H4</Heading>
      <Heading size={5}>Bootstrap Text H5</Heading>
      <Heading size={6}>Bootstrap Text H6</Heading>
      <Text small>Small text</Text>
      <Text mark>Marked text</Text>
    </>
  );
}

export default Content;
