import React from 'react';
import { View, Navbar, Nav, Container, Dropdown, Text } from 'bootstrap-rn';

const NavbarMeta = {
  title: 'Navbar',
  component: Navbar,
  argTypes: {
    //
  },
};

export default NavbarMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <Navbar expand="lg" styleName="bg-light">
        <Container fluid>
          <Navbar.Brand>
            <Text>Navbar</Text>
          </Navbar.Brand>
          <Navbar.Toggler />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link active>
                <Text>Home</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Features</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Pricing</Text>
              </Nav.Link>
              <Dropdown>
                <Nav.Link toggle={Dropdown}>
                  <Text>Dropdown</Text>
                </Nav.Link>
                <Dropdown.Menu end>
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
                  <Dropdown.TextItem>Dropdown Item Text 101</Dropdown.TextItem>
                  <Dropdown.Item>
                    <View>
                      <Text>Dropdown Item 201</Text>
                    </View>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link disabled>
                <Text>Disabled</Text>
              </Nav.Link>
            </Nav>
            <Navbar.Text>Test</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </View>
  );
}
