import { SAVE_LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    email: '',
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      player: { ...action.payload },
    };
  default:
    return state;
  }
};

export default playerReducer;
