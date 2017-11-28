/* eslint arrow-parens: 0 */
import agent from 'superagent';
import Cookie from 'tiny-cookie';

import config from '../../config';

export const AJAX_REQUEST = 'AJAX/REQUEST';


export default store => next => action => {
  if (action.type !== AJAX_REQUEST) {
    return next(action);
  }

  const { done, loading } = action;
  const { url = '', path = '', method = 'get', query = {}, body = {}, headers = {} } = action.request;

  // @TODO: get auth from local storage

  return agent[method](`${url ? url : config.apiUrl}/${path && path}`)
    .query(query)
    .send(body)
    .set(headers)
    .then((response, error) => {
      if (! error) {
        if (typeof done === 'function') {
          return done(response);
        } else {
          return next({
            payload: response.body,
            type: done
          });
        }
      } else {
        if (typeof done === 'function') {
          return done(null, error);
        } else {
          return next({
            error: error,
            type: done
          });
        }
      }
    });
}
