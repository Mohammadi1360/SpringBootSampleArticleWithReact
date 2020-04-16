import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Image,
  Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/index';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (

      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png'/> Log-in to your account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='UserName'
                name="username"
                value={username}
                onChange={this.handleChange}/>

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}/>

              {submitted && !password &&
              <div className="help-block">Password is required</div>
              }

              <Button color='teal' fluid size='large'>
                Login
                {loggingIn}
              </Button>

            </Segment>
          </Form>
          <Message>
            New to us? <a href='/register'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };

