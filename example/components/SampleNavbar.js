import React from 'react';
import { Navbar, Heading, Text } from 'bootstyle';

function SampleNavbar() {
  return (
    <>
      <Heading size={2}>Navbar</Heading>
      <Navbar>
        <Navbar.Brand>BRAND</Navbar.Brand>
        <Navbar.Text>
          <Text>Nav Item</Text>
        </Navbar.Text>
        <Navbar.Text>
          <Text>Nav Item</Text>
        </Navbar.Text>
        <Navbar.Text>TEST</Navbar.Text>
      </Navbar>
    </>
  );
}

export default SampleNavbar;
