import { FETCH_DATA, FETCH_DATA_DONE } from '../constants/data';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default function pictures(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_DONE:
      return {
        ...state,
        data: action.payload,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
