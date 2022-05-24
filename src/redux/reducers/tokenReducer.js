import { GET_TOKEN } from '../actions';

const initialState = '';

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return action.token;
  default:
    return state;
  }
};

export default tokenReducer;
