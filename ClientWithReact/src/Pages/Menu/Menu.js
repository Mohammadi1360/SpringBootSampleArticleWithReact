import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';

const src1 = 'assets/image/logo.png';

export default () => (
  <Menu>
    <Container>
      <Menu.Item as="a" header>
        <Image size="medium" src={src1}/>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item as="a" name="login">
          Login
        </Menu.Item>

        <Menu.Item as="a" name="register">
          Register
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);
