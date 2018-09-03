import superagent from 'superagent';

// Action type

const authUrl = 'https://lab35-josh.herokuapp.com';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Reducer
  let initialState = false;

  export default (state = initialState, action) => {
  
    let {type, payload} = action;
  
    switch(type) {
      case LOGIN: return payload;
      case LOGOUT: return payload;
      default: return state;
    }
  
  };

  //action creators
  
  export const logIn = () => ({
    type: LOGOUT,
    payload: true,
  });
  
  export const logOut = () => ({
    type: LOGIN,
    payload: false,
  });
  
  // export const handleError = (err) => ({
  //   type: 'HANDLE_ERROR',
  //   payload: err,
  // });
  
  
  //thunkers
  
  export const loginReq = (user) => {
    return dispatch => {
      console.log(user)
      superagent.get(`${authUrl}/login`)
        .auth(user.username, user.password)
        .then(res => {
          console.log('fun')
          let token = JSON.stringify(res.text)
          localStorage.setItem('token', token);
          dispatch(logIn());
        })
    };
  };
  
  export const logoutReq = () => {
    return dispatch => {
      localStorage.removeItem('token');
      dispatch(logOut());
    };
  };
  
  export const signupReq = (newUser) => {
    return dispatch => {
      superagent.post(`${authUrl}/signup`)
        .send(newUser)
        .then(res => {
          localStorage.token = JSON.stringify(res.text);
          dispatch(logIn());
        })
    };
  };