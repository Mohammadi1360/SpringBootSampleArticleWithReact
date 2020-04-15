import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './_components';
import { alertActions } from './_actions';
import { history } from './_helpers';
import Menu from './Pages/Menu/Menu';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { HomePage } from './Pages/HomePage';


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
        <Menu/>
        <Container>
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={HomePage}/>
              <Route path="/login" component={LoginPage}/>
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
