import agent from 'superagent';

import { LOGOUT } from '../constants/auth';
import { INSTAGRAM } from '../constants/platforms';
import config from '../../config';
import { FETCH_DATA, FETCH_DATA_DONE } from '../constants/data';

export function authorize(platform) {
  if (platform === INSTAGRAM) {
    location.replace(`https://api.instagram.com/oauth/authorize/?client_id=${config.instagramClientId}&redirect_uri=http://localhost:8080&response_type=token`);
  }
}

export function login(token) {
  agent.get(`${config.instagramApi}/users/self`)
    .query({ access_token: token })
    .end((err, res) => {
      if (res) {
        const { data: { profile_picture, username, id } } = res.body;

        // Save auth data from user into cookie
        window.localStorage.setItem('auth', JSON.stringify({
          ...res.body.data,
          token,
        }));

        agent.post(`${config.apiUrl}/user`)
          .send({
            uid: id,
            token,
            provider: 'instagram',
            profile_picture,
            username,
          })
          .end((err, res) => {
            if (! err && res.body.success) {
              location.replace('/');
            }
          })
      }
    });
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function fetchData() {
  return (dispatch) => {
    // try to load data from local storage
    let auth = window.localStorage.getItem('auth');
    if (auth) {
      auth = JSON.parse(auth);

      // Hint loading data
      dispatch({
        type: FETCH_DATA,
      });

      // Load data from API and in success save them into state
      return agent.get(`${config.apiUrl}/ig_photos`)
        .query({ uid: auth.id })
        .end((err, res) => {
          dispatch({
            type: FETCH_DATA_DONE,
            data: !err ? res.body : [],
            error: err,
          });
        });
    }
  }
}
