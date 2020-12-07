import { SET_USERS, USER_UPDATED, USER_ADDED } from "../actions/users"

const reducer = (state = [], action) => {
  
  switch (action.type) {
    case SET_USERS:
      return action.users

    case USER_ADDED:
      return [...state, action.user]

    case USER_UPDATED:
    let newState = [...state]
    let updateUser = newState.find((user,i) =>{
     if(user.id == action.user.id) return newState[i] = action.user
    })
    return newState

    default:
      return state
  }
}

export default reducer
// 