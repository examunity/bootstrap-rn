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

      <Modal
        visible={modalVisible}
        onToggle={() => setModalVisible((value) => !value)}
        size="xl"
      >
        <Modal.Header>
          <Modal.Title>Modal Title Text</Modal.Title>
          <CloseButton onPress={() => setModalVisible((value) => !value)} />
        </Modal.Header>
        <Modal.Body>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={() => setModalVisible((value) => !value)}>
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
