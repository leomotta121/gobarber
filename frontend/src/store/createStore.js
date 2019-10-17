import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhacer =
    process.env.NODE_ENV === 'development'
      ? compose(
          console.tron.createEnhacer(),
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhacer);
};
