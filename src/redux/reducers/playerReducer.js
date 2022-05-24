const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_PLAYER_DATA':
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
      score: 0,
    };
  case 'SET_PLAYER_SCORE':
    return {
      ...state,
      score: state.score + action.score,
    };
  case 'SET_PLAYER_ASSERTION':
    return {
      ...state,
      assertions: state.assertions + action.hit,
    };
  default:
    return state;
  }
};

export default playerReducer;
