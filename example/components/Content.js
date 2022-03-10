import React from 'react';
import {
  DisplayHeading,
  Heading,
  Link,
  Text,
  Code,
  Blockquote,
  Paragraph,
  Container,
  Row,
  Col,
  Card,
} from 'bootstrap-rn';

const cardmargin = 'mb-3';

function Content() {
  /* eslint-disable jsx-a11y/anchor-is-valid */

  return (
    <>
      <Container styleName={cardmargin}>
        <Row>
          <Col size={12}>
            <Heading size={4}>API</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Heading </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">DisplayHeading </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Paragraph </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Text </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Code </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Blockquote </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
        </Row>
      </Container>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Heading 1-6</Heading>
        </Card.Header>
        <Card.Body>
          <Heading size={1}>Heading H1</Heading>
          <Heading size={2}>Heading H2</Heading>
          <Heading size={3}>Heading H3</Heading>
          <Heading size={4}>Heading H4</Heading>
          <Heading size={5}>Heading H5</Heading>
          <Heading size={6}>Heading H6</Heading>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'<Heading size={1}>Heading H1</Heading>\n'}
            {'<Heading size={2}>Heading H2</Heading>\n'}
            {'<Heading size={3}>Heading H3</Heading>\n'}
            {'<Heading size={4}>Heading H4</Heading>\n'}
            {'<Heading size={5}>Heading H5</Heading>\n'}
            {'<Heading size={6}>Heading H6</Heading>\n'}
          </Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>DisplayHeading 1-6</Heading>
        </Card.Header>
        <Card.Body>
          <DisplayHeading size={1}>DisplayH...g H1</DisplayHeading>
          <DisplayHeading size={2}>DisplayH...g H2</DisplayHeading>
          <DisplayHeading size={3}>DisplayHeading H3</DisplayHeading>
          <DisplayHeading size={4}>DisplayHeading H4</DisplayHeading>
          <DisplayHeading size={5}>DisplayHeading H5</DisplayHeading>
          <DisplayHeading size={6}>DisplayHeading H6</DisplayHeading>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'<DisplayHeading size={1}>DisplayHeading H1</DisplayHeading>\n'}
            {'<DisplayHeading size={2}>DisplayHeading H2</DisplayHeading>\n'}
            {'<DisplayHeading size={3}>DisplayHeading H3</DisplayHeading>\n'}
            {'<DisplayHeading size={4}>DisplayHeading H4</DisplayHeading>\n'}
            {'<DisplayHeading size={5}>DisplayHeading H5</DisplayHeading>\n'}
            {'<DisplayHeading size={6}>DisplayHeading H6</DisplayHeading>\n'}
          </Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Paragraph</Heading>
        </Card.Header>
        <Card.Body>
          <Paragraph>
            This is a very long text lorem ipsum lorem ipsum lorem ipsum This is
            a very long text lorem ipsum lorem ipsum lorem ipsum This is a very
            <Link
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log('pressed!');
              }}
            >
              This is a very long text lorem ipsum lorem ipsum lorem ipsum
            </Link>
            This is a very long text lorem ipsum lorem ipsum lorem ipsum This is
          </Paragraph>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'<Paragraph>\n'}
            {
              '   This is a very long text lorem ipsum lorem ipsum lorem ipsum This is\n'
            }
            {
              '   a very long text lorem ipsum lorem ipsum lorem ipsum This is a very\n'
            }

            {'  <Link onPress={() => {console.log("pressed!"); }}>\n'}
            {
              '    This is a very long text lorem ipsum lorem ipsum lorem ipsum\n'
            }
            {'  </Link>\n'}
            {
              '   This is a very long text lorem ipsum lorem ipsum lorem ipsum This is\n'
            }
            {'</Paragraph>\n'}
          </Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Text</Heading>
        </Card.Header>
        <Card.Body>
          <Text small>Small text</Text>
          <Text mark>Marked text</Text>
          <Text bold>Bold text</Text>
          <Text italic>Italic text</Text>
          <Text color="danger">Deprecated color prop test</Text>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'<Text small>Small text</Text>\n'}
            {'<Text mark>Marked text</Text>\n'}
            {'<Text bold>Bold text</Text>\n'}
            {'<Text italic>Italic text</Text>\n'}
            {'<Text color="danger">Deprecated color prop test</Text>\n'}
          </Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Code</Heading>
        </Card.Header>
        <Card.Body>
          <Code>Code text ...</Code>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{'<Code>Code text ...</Code>\n'}</Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Blockquote</Heading>
        </Card.Header>
        <Card.Body>
          <Blockquote>
            <Text>Blockquote</Text>
          </Blockquote>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'<Blockquote>\n'}
            {' <Text>Blockquote</Text>\n'}
            {'<Blockquote>\n'}
          </Code>
        </Card.Footer>
      </Card>
    </>
  );
  /* eslint-enable */
}

export default Content;
