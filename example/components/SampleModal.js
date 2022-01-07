import React, { useState } from 'react';
import { Modal, Heading, Text, Button, CloseButton } from 'bootstyle';

function SampleModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Heading size={2}>Modal</Heading>
      <Button onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </Button>

      <Modal visible={modalVisible}>
        <Modal.Header>
          <Text>Modal Title Text</Text>
          <CloseButton onPress={() => setModalVisible(!modalVisible)} />
        </Modal.Header>
        <Modal.Body>
          <Text>Body Text</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={() => setModalVisible(!modalVisible)}>
            <Text>Submit</Text>
          </Button>
          <Button onPress={() => setModalVisible(!modalVisible)}>
            <Text>Close</Text>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SampleModal;
