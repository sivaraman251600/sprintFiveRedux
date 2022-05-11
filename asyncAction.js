//Import the necessary Requirements
const redux = require("redux");
const reduxthunk = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;



// initialState for the Loading, Users, Error

const initialState = {
  loading: true,
  users: [],
  error: "",
};

// Create Action
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users
  };
};

const fetchUserFailure = (err) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: err
  };
};

const fetchUserDetails = () => {
    return function (dispatch) {
      dispatch(fetchUserRequest());
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          //const users = res.data.map((user) => user.id);
          const users = res.data.map((user)=>user.id)
          dispatch(fetchUserSuccess(users));
        })
        .catch((err) => {
          dispatch(fetchUserFailure(err.message));
        });
    };
  };

// Create Reducer Function

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    default : return state
  }
};


// CreateStore for the Async

const store = createStore(reducer, applyMiddleware(reduxthunk));
store.subscribe(() => {console.log(store.getState())});
store.dispatch(fetchUserDetails());
