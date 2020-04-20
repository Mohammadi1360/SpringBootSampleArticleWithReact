import React from 'react';
import { connect } from 'react-redux';
import { ArticleForm } from '../ArticlePage/ArticleForm';
import { TopMenu } from '../Menu/TopMenu';


class HomePage extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div className="col-md-6 col-md-offset-3">
        <TopMenu/>
        <h1>{user.username}</h1>
        <ArticleForm/>

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
