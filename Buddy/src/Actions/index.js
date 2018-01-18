import Amplify, { API } from 'aws-amplify-react-native';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);

export function addLog (log) {
  console.log('add log');
  return {
    type: 'ADD_LOG',
    payload: log,
  }
}

export function addWish(wish) {
  console.log('add to wishlist');
  return {
    type: 'ADD_WISHLIST',
    payload: wish,
  }
}

export function rmLog (log) {
  console.log('remove log');
  return {
    type: 'DELETE_LOG',
    payload: log,
  }
}

export function rmWish (wish) {
  console.log('remove wish');
  return {
    type: 'DELETE_WISHLIST',
    payload: wish,
  }
}

export function updateLog (log) {
  console.log('update log');
  return {
    type: 'UPDATE_LOG',
    payload: log,
  }
}

export function selectLog (log) {
  return {
    type: "SELECT_LOG",
    payload: log,
  }
}

export function deselectLog (log) {
  return {
    type: "DESELECT_LOG",
  }
}

export function findItem (response) {
  return {
    type: 'FIND_ITEM',
    payload: response,
  }
}

export function fetchStrains (response) {
  return {
    type: 'GET_ALL',
    payload: response,
  }
}


export const login = (username, userId, response) => {
  console.log(username)
  console.log(userId)
  console.log(response)

      return {
        type: 'LOGIN',
        username: username,
        userId: userId,
        response: response,
      };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const signup = (userId) => {
  let myInit = {
      body: {
        userId: userId,
      }
  }

  API.post(apiName, path, myInit).then(response => {
      // Add your code here
  });
};
