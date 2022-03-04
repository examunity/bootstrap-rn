import React from 'react';
import { Heading, Text, Code, View } from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<Text styleName="bg-primary opacity-50 text-danger lh-base p-3">\n' +
  'Anton\n' +
  '</Text>\n' +
  '<Text styleName="text-success m-n3">Patrik</Text>\n' +
  '</>';

function Utilities() {
  return (
    <>
      <Heading size={2}>Utilities</Heading>
      <Text styleName="bg-primary opacity-50 text-danger lh-base p-3">
        Anton
      </Text>
      <Text styleName="text-success m-n3">Patrik</Text>

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>
    </>
  );
}

export default Utilities;
