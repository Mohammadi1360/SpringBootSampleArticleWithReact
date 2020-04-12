import { articleConstants } from '../_constants';

export function articles(state = {}, action) {
  switch (action.type) {
    case articleConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case articleConstants.GETALL_SUCCESS:
      return {
        items: action.articles,
      };
    case articleConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case articleConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(article =>
          article.id === action.id
            ? { ...article, deleting: true }
            : article,
        ),
      };
    case articleConstants.DELETE_SUCCESS:
      // remove deleted article from state
      return {
        items: state.items.filter(article => article.id !== action.id),
      };
    case articleConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(article => {
          if (article.id === action.id) {
            // make copy of article without 'deleting:true' property
            const { deleting, ...articleCopy } = article;
            // return copy of article with 'deleteError:[error]' property
            return { ...articleCopy, deleteError: action.error };
          }

          return article;
        }),
      };
    default:
      return state;
  }
}
