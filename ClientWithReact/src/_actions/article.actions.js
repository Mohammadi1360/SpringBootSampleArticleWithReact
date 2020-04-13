import { articleConstants, userConstants } from '../_constants';
import { articleService, userService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const articleActions = {
  logout,
  getAllArticles,
  deleteArticle,
  saveArticle,
};


function logout() {
  articleService.logout();
  return { type: articleConstants.LOGOUT };
}

function getAllArticles() {
  return dispatch => {
    dispatch(request());
    console.log('getAllArticles ===');

    articleService.getAllArticles()
      .then(
        articles => dispatch(success(articles)),
        error => dispatch(failure(error.toString())),
      );

  };

  function request() {
    return { type: articleConstants.GETALL_REQUEST };
  }

  function success(articles) {
    return { type: articleConstants.GETALL_SUCCESS, articles };
  }

  function failure(error) {
    return { type: articleConstants.GETALL_FAILURE, error };
  }
}

function saveArticle(article) {
  return dispatch => {
    dispatch(request(article));

    articleService.saveArticle(article)
      .then(
        article => {
          dispatch(success(article));
          dispatch(alertActions.success('Registration successful'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request(article) {
    return { type: articleConstants.REGISTER_REQUEST, article };
  }

  function success(article) {
    return { type: articleConstants.REGISTER_SUCCESS, article };
  }

  function failure(error) {
    return { type: articleConstants.REGISTER_FAILURE, error };
  }
}

function deleteArticle(id) {
  return dispatch => {
    dispatch(request(id));
    articleService.deleteArticle(id)
      .then(
        article => dispatch(success(id)),
        error => dispatch(failure(id, error.toString())),
      );
  };

  function request(id) {
    return { type: articleConstants.DELETE_REQUEST, id };
  }

  function success(id) {
    return { type: articleConstants.DELETE_SUCCESS, id };
  }

  function failure(id, error) {
    return { type: articleConstants.DELETE_FAILURE, id, error };
  }
}
