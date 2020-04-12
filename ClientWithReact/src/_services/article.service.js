import { config } from '../config';
import { authHeader } from '../_helpers';

export const articleService = {
  logout,
  getAllArticles,
  deleteArticle,
};

function getAllArticles() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
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
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
