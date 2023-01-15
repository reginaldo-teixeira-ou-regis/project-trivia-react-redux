import { SAVE_LOGIN, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,

    };
  default:
    return state;
  }
};

export default playerReducer;
