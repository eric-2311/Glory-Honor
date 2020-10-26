import * as SessionApiUtils from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_EMAIL = 'RECEIVE_EMAIL';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

//Regular action creator returning an object with all users
const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
})

//Thunk action creator to fetch all users from backend
export const fetchUsers = () => dispatch => (
    SessionApiUtils.getUsers()
        .then(users => dispatch(receiveUsers(users)))
)

//Regular action creator returning an object with current user
const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
})

//Regular action creator returning an object with errors
const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

//Thunk action creator to login a user or display errors
export const login = user => dispatch => (
    SessionApiUtils.login(user)
        .then(user => (dispatch(receiveCurrentUser(user))),
        err => dispatch(receiveErrors(err.responseJSON)))
)

//Regular action creator returning an object with data input from user to create user account
const signUpUser = user => ({
    type: SIGN_UP_USER,
    user
})

//Thunk action creator to create a new user account or display errors
export const signup = user => dispatch => (
    SessionApiUtils.signup(user)
        .then(user => (dispatch(signUpUser(user))),
        err => dispatch(receiveErrors(err.responseJSON)))
)

//Regular action creator returning an object with type LOGOUT_CURRENT_USER
const logoutUser = () => ({
    type: LOGOUT_CURRENT_USER
})

//Thunk action creator to logout a user from session or display errors
export const logout = () => dispatch => (
    SessionApiUtils.logout()
        .then(() => (dispatch(logoutUser())),
        err => dispatch(receiveErrors(err.responseJSON)))
)

//Regular action creaator returning an object with type RECEIVE_EMAIL
const getEmail = () => ({
    type: RECEIVE_EMAIL,
    email
})

//Thunk action creator to receive email if email exists in database
export const validateEmail = email => dispatch => (
    SessionApiUtils.getEmail(email)
        .then(email => dispatch(getEmail(email)))
)

//Regular action creator returning an object with type CLEAR_ERRORS
export const clearErrors = () => ({
    type: CLEAR_ERRORS
})