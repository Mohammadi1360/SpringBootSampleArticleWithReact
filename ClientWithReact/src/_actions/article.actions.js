import { articleConstants } from '../_constants';
import { articleService } from '../_services';
import { alertActions } from './alert.actions';
import _ from 'lodash';

const defaultItem = {
  id: 0,
  rfid: '',
  articleName: '',
  articleNumber: 0,
  storageLocation: '',
  price: 0,
};

export const articleActions = {
  logout,
  getAllArticles,
  searchArticles,
  getArticleById,
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

function searchArticles(items, item) {
  items = _.filter(items, item);

  return dispatch => {
    dispatch(success(items));
  };

  function success(articles) {
    return { type: articleConstants.CLIENT_SEARCH_REQUEST, articles };
  }
}

function getArticleById(id) {
  return dispatch => {

    if (id === 0) {
      dispatch(success(defaultItem));
    } else {
      dispatch(request({ id }));

      articleService.getArticleById(id)
        .then(
          article => {
            dispatch(success(article));
          },
          error => {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          },
        );
    }
  };

  function request(article) {
    return { type: articleConstants.GET_REQUEST, article };
  }

  function success(article) {
    return { type: articleConstants.GET_SUCCESS, article };
  }

  function failure(error) {
    return { type: articleConstants.GET_FAILURE, error };
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
        article => {
          dispatch(success(id));
          dispatch(alertActions.success('Delete successfully'));
        },
        error => {
          dispatch(failure(id, error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
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
