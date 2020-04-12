import {articleConstants} from '../_constants';
import {articleService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const articleActions = {
    logout,
    getAll
};


function logout() {
    articleService.logout();
    return {type: articleConstants.LOGOUT};
}

function getAll() {
    return dispatch => {
        dispatch(request());
        console.log('getAll ===');

        articleService.getAll()
            .then(
                articles => dispatch(success(articles)),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: articleConstants.GETALL_REQUEST}
    }

    function success(articles) {
        return {type: articleConstants.GETALL_SUCCESS, articles}
    }

    function failure(error) {
        return {type: articleConstants.GETALL_FAILURE, error}
    }
}
