const namePlayer = (name, gravatarEmail) => ({ type:
  'SET_PLAYER_DATA',
name,
gravatarEmail });

export const scorePlayer = (score) => ({ type: 'SET_PLAYER_SCORE', score });

export const assertionPlayer = (hit) => ({ type: 'SET_PLAYER_ASSERTION', hit });

export default namePlayer;
