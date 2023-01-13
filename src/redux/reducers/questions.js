import { GET_REQUEST_QUESTION } from '../actions';

const INITIAL_STATE = {
  responseCode: '',
  results: [],
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_REQUEST_QUESTION:
    return {
      ...state,
      responseCode: action.payload.response_code,
      results: [...action.payload.results],
    };
  default:
    return state;
  }
};

export default questionsReducer;
