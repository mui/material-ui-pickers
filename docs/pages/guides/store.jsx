import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  form: formReducer,
});

const store = createStore(
  rootReducer
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
