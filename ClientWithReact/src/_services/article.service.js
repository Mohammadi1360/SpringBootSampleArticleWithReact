import { config } from '../config';
import { authHeader } from '../_helpers';

export const articleService = {
  logout,
  getAllArticles,
  deleteArticle,
  saveArticle,
  getArticleById,
};

function getAllArticles() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.url.API_URL}/api/article`, requestOptions).then(handleResponse);
}

function getArticleById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.url.API_URL}/api/article/${id}`, requestOptions).then(handleResponse);
}


function saveArticle(article) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(article),
  };

  return fetch(`${config.url.API_URL}/api/article`, requestOptions).then(handleResponse);
}

function deleteArticle(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${config.url.API_URL}/api/article/${id}`, requestOptions).then(handleResponse);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  console.log('response');
  console.log(response);

  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if (401) response returned from api
        logout();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      console.log(error);
      // const error = text;
      return Promise.reject(text);
    }

    return data;
  });
}
