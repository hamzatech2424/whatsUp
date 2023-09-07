// store
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './Reducers';

const initailState={}
const middleWare = [thunk];


let store = null;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    RootReducer,
    initailState,
    compose(
      applyMiddleware(...middleWare),
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
} else {
  store = createStore(
    RootReducer,
    initailState,
    compose(applyMiddleware(...middleWare)),
  );
}
export default store;
