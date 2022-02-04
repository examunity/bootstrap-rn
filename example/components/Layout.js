import React from 'react';
import { StatusBar } from 'react-native';
import {
  ScrollView,
  Container,
  Col,
  Row,
  ListGroup,
  Text,
  css,
  StyleSheet,
} from 'bootstyle';
import { Outlet } from '../libs/react-router';

const styles = StyleSheet.create({
  container: css`
    max-width: 960px;
    margin-vertical: 1rem;
  `,
});

function Layout() {
  return (
    <>
      <StatusBar />
      <ScrollView>
        <Container style={styles.container}>
          <Row>
            <Col size={12} sizeMd={4}>
              <ListGroup styleName="mb-3">
                <ListGroup.ItemAction to="/">
                  <Text>Content</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/forms">
                  <Text>Forms</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/alerts">
                  <Text>Alerts</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/badges">
                  <Text>Badges</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/buttons">
                  <Text>Buttons</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/button-group">
                  <Text>Button group</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/cards">
                  <Text>Cards</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/collapse">
                  <Text>Collapse</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/dropdown">
                  <Text>Dropdown</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/grid">
                  <Text>Grid</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/list-group">
                  <Text>List group</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/modal">
                  <Text>Modal</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/nav">
                  <Text>Nav</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/navbar">
                  <Text>Navbar</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/offcanvas">
                  <Text>Offcanvas</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/popovers">
                  <Text>Popovers</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/progress">
                  <Text>Progress</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/toasts">
                  <Text>Toasts</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/tooltips">
                  <Text>Tooltips</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/utilities">
                  <Text>Utilities</Text>
                </ListGroup.ItemAction>
                <ListGroup.ItemAction to="/formik">
                  <Text>Formik</Text>
                </ListGroup.ItemAction>
              </ListGroup>
            </Col>
            <Col size={12} sizeMd={8}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </ScrollView>
    </>
  );
}

export default Layout;
