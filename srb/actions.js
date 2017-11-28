import agent from 'superagent';
import config from './config';

export const storageKey = 'auth';
export const storage = window.localStorage;

export function authorize() {
  window.location.href = `https://www.instagram.com/oauth/authorize/?client_id=${config.instagramClientId}&redirect_uri=http://localhost:8080&response_type=token`;
};

export function fetchData(token) {
  return new Promise((resolve, reject) => {
    agent.get(`${config.apiUrl}/photos`)
    .set({ Authorization: token })
    .end((err, res) => {
      if (! err) {
        resolve(res.body);
      }
    });
  })
}
