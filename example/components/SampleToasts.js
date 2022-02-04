import React from 'react';
import { ToastContainer, Toast, Heading, Text } from 'bootstyle';

function SampleToasts() {
  return (
    <>
      <Heading size={2}>Toasts</Heading>
      <Toast styleName="mb-3">
        <Toast.Header>
          <Text bold>Heading</Text>
        </Toast.Header>
        <Toast.Body>
          <Text>Body</Text>
        </Toast.Body>
      </Toast>
      <ToastContainer>
        <Toast>
          <Toast.Header>
            <Text bold>Heading</Text>
          </Toast.Header>
          <Toast.Body>
            <Text>Body</Text>
          </Toast.Body>
        </Toast>
        <Toast>
          <Toast.Header>
            <Text bold>Heading</Text>
          </Toast.Header>
          <Toast.Body>
            <Text>Body</Text>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default SampleToasts;
