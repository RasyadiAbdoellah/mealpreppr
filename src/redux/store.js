import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers";
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';
import { throttle } from 'lodash';
import ReduxThunk from 'redux-thunk';

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const persistedState = loadState()



const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(ReduxThunk)))


store.subscribe(throttle(() => {
  saveState({
    recipes: store.getState().recipes
  });
}, 1000));

export default store