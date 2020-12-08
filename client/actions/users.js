import { fetchUsersAPI, addUserAPI, editUserAPI } from "../apis/users"

export const SET_USERS = 'SET_USERS'
export const USER_ADDED = 'USER_ADDED'
export const ACTIVE_USER_CHANGED = 'ACTIVE_USER_CHANGED'
export const USER_UPDATED = 'USER_UPDATED'
export const ACTIVE_USER_UPDATED = 'ACTIVE_USER_UPDATED'
export const ACTIVE_USER_REMOVED = 'ACTIVE_USER_REMOVED'

export const fetchUsers = () => {
  return dispatch => {
    fetchUsersAPI()
    .then(users => dispatch(setUsers(users)))
  }
}

export const setUsers = users => {
  return {
    type: SET_USERS,
    users
  }
}

export const addNewUser = user => {
  return dispatch => {
    addUserAPI(user)
    .then(id => {
      user.id = id
      dispatch(addUser(user))
    })
  }
}

export const editUser = (id, user) => {
  return dispatch => {
    editUserAPI(id, user)
    .then(() => dispatch(updateUser(id, user)))
  }
}

export const updateUser = (id, user) => {
  return {
    type: USER_UPDATED,
    id,
    user
  }
}

export const addUser = user => {
  return {
    type: USER_ADDED,
    user
  }
}

export const changeActiveUser = user => {
  return {
    type: ACTIVE_USER_CHANGED,
    user
  }
}

export const removeActiveUser = () => {
  return {
    type: ACTIVE_USER_REMOVED,
  }
}
