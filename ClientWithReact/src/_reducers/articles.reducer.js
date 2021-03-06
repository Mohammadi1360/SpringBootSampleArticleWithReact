import { articleConstants } from '../_constants';

const initialState = {
  items: [],
  itemsAfterSearch: [],
  item: {},
  error: false,
  loading: false,
};

export function articles(state = initialState, action) {
  switch (action.type) {
    case articleConstants.GETALL_REQUEST:
      return {
        ...state,
        items: [],
        itemsAfterSearch: [],
        loading: true,
        error: false,
      };
    case articleConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.articles,
        itemsAfterSearch: action.articles,
        loading: false,
        error: false,
      };
    case articleConstants.GETALL_FAILURE:
      return {
        ...state,
        items: [],
        itemsAfterSearch: [],
        loading: false,
        error: action.error,
      };

    case articleConstants.GET_REQUEST:
      return {
        ...state,
        item: {},
        loading: true,
        error: false,
      };
    case articleConstants.GET_SUCCESS:
      return {
        ...state,
        item: action.article,
        loading: false,
        error: false,
      };
    case articleConstants.CLIENT_SEARCH_REQUEST:
      return {
        ...state,
        itemsAfterSearch: action.articles,
        loading: false,
        error: false,
      };

    case articleConstants.GET_FAILURE:
      return {
        ...state,
        item: {},
        loading: false,
        error: action.error,
      };

    case articleConstants.DELETE_REQUEST:
      return {
        ...state,
        error: false,
        items: state.items.map(article =>
          article.id === action.id
            ? { ...article, deleting: true }
            : article,
        ),
        itemsAfterSearch: state.items.map(article =>
          article.id === action.id
            ? { ...article, deleting: true }
            : article,
        ),
      };
    case articleConstants.DELETE_SUCCESS:
      // remove deleted article from state
      return {
        ...state,
        error: false,
        items: state.items.filter(article => article.id !== action.id),
        itemsAfterSearch: state.items.filter(article => article.id !== action.id),
      };
    case articleConstants.DELETE_FAILURE:
      // return {
      //   ...state,
      //   error: action.error,
      //   items: state.items.filter(article => article.id !== action.id),
      // };
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
        itemsAfterSearch: state.items.map(article => {
          if (article.id === action.id) {
            // make copy of article without 'deleting:true' property
            const { deleting, ...articleCopy } = article;
            // return copy of article with 'deleteError:[error]' property
            return { ...articleCopy, deleteError: action.error };
          }

          return article;
        }),
      };

    case articleConstants.REGISTER_REQUEST:
      return {
        ...state,
        item: action.article,
        // items: state.items.push(action.article),
        loading: true,
        error: false,
      };
    case articleConstants.REGISTER_SUCCESS:
      return {
        ...state,
        item: action.article,
        loading: false,
        error: false,
      };
    case articleConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
