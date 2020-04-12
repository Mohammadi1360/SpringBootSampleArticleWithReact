import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {users} from './users.reducer';
import {articles} from './articles.reducer';
import {alert} from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    users,
    articles,
    alert
});

export default rootReducer;
