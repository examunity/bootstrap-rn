import React, { useState } from 'react';
import { Modal, Heading, Text, Button } from 'bootstyle';

function Modals() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Heading size={2}>Modals</Heading>
      <Button onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </Button>

      <Modal visible={modalVisible}>
        <Modal.Header>
          <Text>Modal Title Text</Text>
          <Button onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Text>Body Text</Text>
        </Modal.Body>
        <Modal.Footer>
          <Text>Footer Text</Text>
          <Button onPress={() => setModalVisible(!modalVisible)}>
            <Text>Hide modal</Text>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
