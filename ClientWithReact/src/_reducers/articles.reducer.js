import {articleConstants} from '../_constants';

export function articles(state = {}, action) {
    switch (action.type) {
        case articleConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case articleConstants.GETALL_SUCCESS:
            return {
                items: action.articles
            };
        case articleConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
