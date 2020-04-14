import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ArticleForm } from '../ArticlePage/ArticleForm';


class HomePage extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>{user.username}</h1>

        <ArticleForm/>

        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
