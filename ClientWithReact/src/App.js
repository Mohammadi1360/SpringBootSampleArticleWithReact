import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './_components';
import { alertActions } from './_actions';
import { history } from './_helpers';
import { TopMenu } from './Pages/Menu/TopMenu';
import { LoginPage } from './Pages/Login/LoginPage';
import { HomePage } from './Pages/HomePage';
import { UserRegisterPage } from './Pages/Login/UserRegisterPage';


class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <Fragment>
        <Container>
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={HomePage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={UserRegisterPage}/>
            </div>
          </Router>
        </Container>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
