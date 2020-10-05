import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {reducer as wholesaleReviewReducer} from '@example/wholesale-review';

export default combineReducers({
    routing: routerReducer,
    wholesaleReview: wholesaleReviewReducer
});