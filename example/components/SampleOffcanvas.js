import React, { useState } from 'react';
import {
  Offcanvas,
  Heading,
  Text,
  Button,
  CloseButton,
  View,
} from 'bootstrap-rn';

function SampleOffcanvas() {
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
  const [offcanvasPlacement, setOffcanvasPlacement] = useState('top');

  return (
    <>
      <Heading size={2}>Offcanvas</Heading>
      <Button
        onPress={() => {
          setOffcanvasVisible(true);
          setOffcanvasPlacement('top');
        }}
      >
        <Text>Show Offcanvas Top</Text>
      </Button>
      <Button
        onPress={() => {
          setOffcanvasVisible(true);
          setOffcanvasPlacement('bottom');
        }}
      >
        <Text>Show Offcanvas Bottom</Text>
      </Button>

      <Button
        onPress={() => {
          setOffcanvasVisible(true);
          setOffcanvasPlacement('start');
        }}
      >
        <Text>Show Offcanvas Left</Text>
      </Button>
      <Button
        onPress={() => {
          setOffcanvasVisible(true);
          setOffcanvasPlacement('end');
        }}
      >
        <Text>Show Offcanvas Right</Text>
      </Button>

      <Offcanvas
        visible={offcanvasVisible}
        placement={offcanvasPlacement}
        onToggle={() => setOffcanvasVisible((value) => !value)}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>Offcanvas Title Text</Offcanvas.Title>
          <CloseButton onPress={() => setOffcanvasVisible((value) => !value)} />
        </Offcanvas.Header>
        <Offcanvas.Body>
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
          <View>
            <Button onPress={() => setOffcanvasVisible((value) => !value)}>
              <Text>Close</Text>
            </Button>
          </View>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SampleOffcanvas;
