import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import connect from 'react-redux/es/connect/connect';
import {
  withRouter,
} from 'react-router-dom';

const src1 = '/logo2.png';


class TopMenu extends React.Component {

  login = () => {
    this.props.history.push('/login');
  };


  render() {
    const { user } = this.props;
    return (
      <Menu>
        <Container>
          <Menu.Item as="a" header>
            <Image size="tiny" src={src1}/>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item as="a" name="login" onClick={this.login}>
              {!user ? 'Login' : 'Logout'}
            </Menu.Item>

            <Menu.Item as="a" name="register">
              Register
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  };
}

const connectedTopMenu = withRouter(connect(mapStateToProps)(TopMenu));
export { connectedTopMenu as TopMenu };

