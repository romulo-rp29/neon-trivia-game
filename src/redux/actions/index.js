export const GET_TOKEN = 'GET_TOKEN';

const requestToken = (token) => ({ type: GET_TOKEN, token });
const failRequest = (error) => ({ type: 'FAIL', error });

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(requestToken(data.token));
  } catch (error) {
    dispatch(failRequest(error));
  }
};
