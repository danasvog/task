import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const devMiddlewareWrapper = composeWithDevTools(applyMiddleware(thunk));
const prodMiddlewareWrapper = applyMiddleware(thunk);

const middleware = __DEV__ ? devMiddlewareWrapper : prodMiddlewareWrapper;

export default () => createStore(reducers, middleware);
