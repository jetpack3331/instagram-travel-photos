import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';
import ajaxMiddleware from './middleware/ajax';

export default function configureStore(initialState = {}) {
  let middlewares = [
    thunk,
    ajaxMiddleware,
  ];

  if (typeof __DEVELOPMENT__ !== 'undefined' && __DEVELOPMENT__) {
    middlewares.push(createLogger({ collapsed: true }));
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        ...middlewares,
      ),
      // process.env.REACT_APP_DEV_TOOLS === 'true' ? DevTools.instrument() : f => f,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

