import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { alertActions, articleActions, userActions } from '../../_actions/index';
import { Modal } from 'semantic-ui-react/dist/commonjs/modules/Modal/Modal';
import { history } from '../../_helpers';
import { alert } from '../../_reducers/alert.reducer';

const defaultItem = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  username: '',
  password: '',
  termAndConditions: false,
};


class UserRegisterPage extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      item: defaultItem,
      submitted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleItemChanges = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  };

  handleTermAndConditionChecked = (event) => {
    let item = { ...this.state.item };
    item.termAndConditions = !item.termAndConditions;
    this.setState({ item });
  };

  async registerUser(user) {
    this.props.dispatch(userActions.register(user));
    console.log('here1');
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const user = this.state.item;
    const { dispatch } = this.props;

    if (user.firstName &&
      user.lastName &&
      user.emailAddress &&
      user.username &&
      user.password) {
      this.registerUser(user).then(() => {
        const timer = setTimeout(() => {
          if (this.props.alert.type === 'alert-success') {
            history.push('/login');
          }

          this.props.dispatch(alertActions.clear());
        }, 3000);
      });

    }


  }

  render() {
    const { loggingIn, alert } = this.props;
    const { item, submitted } = this.state;

    // let errorList = [];
    // try {
    //   errorList = JSON.parse(articles.error);
    // } catch (e) {
    //   errorList = [];
    // }

    return (

      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png'/> User Signup
          </Header>
          <Message size='tiny'
                   success={alert.type === 'alert-success'}
                   warning={alert.type === 'alert-error'}
                   negative={alert.type === 'alert-danger'}
                   hidden={!alert.type}>
            {alert.message}
          </Message>

          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked textAlign='left'>

              <Dimmer active={!!alert.type} inverted>
                <Loader size='medium'>Loading</Loader>
              </Dimmer>

              <Form.Group widths='equal'>
                <Form.Input fluid
                            name="firstName"
                            onChange={this.handleItemChanges}
                            value={item.firstName}
                            placeholder='First name'
                            error={submitted && !item.firstName}/>
                <Form.Input fluid
                            name="lastName"
                            onChange={this.handleItemChanges}
                            value={item.lastName}
                            placeholder='Last name'
                            error={submitted && !item.lastName}/>
              </Form.Group>

              <Form.Input
                id='emailAddress'
                name="emailAddress"
                onChange={this.handleItemChanges}
                value={item.emailAddress}
                placeholder='Email Address'
                error={submitted && !item.emailAddress}
              />

              <Form.Group widths='equal'>
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='UserName'
                  name="username"
                  onChange={this.handleItemChanges}
                  value={item.username}
                  error={submitted && !item.username}/>

                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleItemChanges}
                  value={item.password}
                  error={submitted && !item.password}/>

              </Form.Group>


              <Form.Checkbox
                name="termAndConditions"
                required
                checked={item.termAndConditions}

                onChange={(e) => this.handleTermAndConditionChecked(e)}
                label='I agree to the Terms and Conditions'/>

              <Button color='teal' fluid size='large' disabled={!this.state.item.termAndConditions}>
                Register
                {loggingIn}
              </Button>

            </Segment>
          </Form>

          <Message>
            Already Registered ? <a href='/login'>Login</a>
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
    alert: state.alert,
  };
}

const connectedUserRegisterPage = connect(mapStateToProps)(UserRegisterPage);
export { connectedUserRegisterPage as UserRegisterPage };

