import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';
import { authReducer } from './reducers/auth.reducer';
import { messengerReducer } from './reducers/messenger.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  messenger: messengerReducer,
});

const middleware = [thunkMiddlware];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
