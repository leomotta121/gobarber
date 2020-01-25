// Actions
export const SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const SIGN_UP_REQUEST = '@auth/SIGN_UP_REQUEST ';
export const SIGN_FAILURE = '@auth/SIGN_IN_FAILURE';

// Actions creators
export function signInRequest(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { name, email, password },
  };
}

export function signFailure() {
  return {
    type: SIGN_FAILURE,
  };
}
