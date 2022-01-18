import React from 'react';
import { Navbar, Container, Heading, Text } from 'bootstyle';

function SampleNavbar() {
  return (
    <>
      <Heading size={2}>Navbar</Heading>
      <Navbar styleName="bg-light">
        <Container fluid styleName="flex-row">
          <Navbar.Brand>
            <Text>BRAND</Text>
          </Navbar.Brand>
          <Navbar.Text>Nav Item</Navbar.Text>
          <Navbar.Text>Nav Item</Navbar.Text>
          <Navbar.Text>TEST</Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
}

export default SampleNavbar;
