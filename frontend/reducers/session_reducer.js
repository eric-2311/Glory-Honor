//Importing necessary constants to represent action.type
import {
    RECEIVE_CURRENT_USER, 
    LOGOUT_CURRENT_USER, 
    SIGN_UP_USER
} from '../actions/session_actions';

//Using a constant where id points to null to indicate logging out a user
const _nullUser = Object.freeze({ id: null });

//Will have the default state be a logged out user
const sessionReducer = (state = _nullUser, action) => {
    //Ensuring the state isn't accidentally mutated
    Object.freeze(state);

    //Using a switch statement to determine how session state will change
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            //Assigning the id to the current user's id to be logged in
            return Object.assign({}, state, { id: action.currentUser.id });
        case SIGN_UP_USER:
            //Assigning the id to the user being signed up to login
            return Object.assign({}, state, { id: action.user.id });
        case LOGOUT_CURRENT_USER:
            //Returning the null user in the event of logout
            return _nullUser;
        default:
            return state;
    }
}

export default sessionReducer;