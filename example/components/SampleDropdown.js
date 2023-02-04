import React from 'react';
import {
  Dropdown,
  Text,
  Heading,
  Button,
  View,
  Container,
  Row,
  Col,
  Code,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n ' +
  ' <Dropdown direction="bottom">\n ' +
  '   <Button toggle={Dropdown} styleName="as-center">\n ' +
  '     <Text>Show Dropdown</Text>\n ' +
  '   </Button>\n ' +
  '   <Dropdown.Menu>\n ' +
  '     <Dropdown.Header>\n ' +
  '       <Text>Dropdown header</Text>\n ' +
  '     </Dropdown.Header>\n ' +
  '     <Dropdown.Divider />\n ' +
  '     <Dropdown.Item active disabled>\n ' +
  '       <View>\n ' +
  '         <Text>Dropdown Item 101</Text>\n ' +
  '       </View>\n ' +
  '     </Dropdown.Item>\n ' +
  '     <Dropdown.Item active>\n ' +
  '       <View>\n ' +
  '         <Text>Dropdown Item 102</Text>\n ' +
  '       </View>\n ' +
  '     </Dropdown.Item>\n ' +
  '       <Dropdown.ItemText>Dropdown Item Text 101</Dropdown.ItemText>\n ' +
  '     <Dropdown.Item>\n ' +
  '       <View>\n ' +
  '         <Text>Dropdown Item 201</Text>\n ' +
  '       </View>\n ' +
  '     </Dropdown.Item>\n ' +
  '   </Dropdown.Menu>\n ' +
  ' </Dropdown>\n ' +
  '</>';

function SampleDropdowns() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Dropdown</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Dropdown </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
        </Row>
      </Container>
      {/* PROPS -----------------------------------------------------  */}
      <Container styleName="mb-5">
        <Row styleName="bg-secondary">
          <Col size={6}>
            <Text>Propname</Text>
          </Col>
          <Col size={6}>
            <Text>Value</Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>visible</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.bool</Text>
          </Col>
        </Row>

        <Row styleName="bg-info">
          <Col size={6}>
            <Text>onToggle</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.func</Text>
          </Col>
        </Row>

        <Row styleName="">
          <Col size={6}>
            <Text>direction</Text>
          </Col>
          <Col size={6}>
            <Text small>
              [&apos;up&apos;, &apos;down&apos;, &apos;start&apos;,
              &apos;end&apos;]
            </Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Dropdown
          </Heading>
        </Card.Header>
        <Card.Body>
          <View>
            <Dropdown styleName="mb-3">
              <Dropdown.Toggle>
                {(toggleProps) => (
                  <Button {...toggleProps} styleName="as-center">
                    <Text>Show Dropdown</Text>
                  </Button>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>
                  <Text>Dropdown header</Text>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item active disabled>
                  <View>
                    <Text>Dropdown Item 101</Text>
                  </View>
                </Dropdown.Item>
                <Dropdown.Item active>
                  <View>
                    <Text>Dropdown Item 102</Text>
                  </View>
                </Dropdown.Item>
                <Dropdown.ItemText>Dropdown Item Text 101</Dropdown.ItemText>
                <Dropdown.Item>
                  <View>
                    <Text>Dropdown Item 201</Text>
                  </View>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown direction="up" center>
              <Button toggle={Dropdown} styleName="as-center">
                <Text>Show Dropdown</Text>
              </Button>
              <Dropdown.Menu>
                <Dropdown.Header>
                  <Text>Dropdown header</Text>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item active disabled>
                  <View>
                    <Text>Dropdown Item 101</Text>
                  </View>
                </Dropdown.Item>
                <Dropdown.Item active>
                  <View>
                    <Text>Dropdown Item 102</Text>
                  </View>
                </Dropdown.Item>
                <Dropdown.ItemText>Dropdown Item Text 101</Dropdown.ItemText>
                <Dropdown.Item>
                  <View>
                    <Text>Dropdown Item 201</Text>
                  </View>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleDropdowns;
