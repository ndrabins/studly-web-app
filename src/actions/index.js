import request from 'superagent';
import Firebase from 'firebase';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

const config = {
    apiKey: "AIzaSyDVmPnm6gixi4mZ-rrhXQPzHTCKGjiF2Aw",
    authDomain: "studly-ed04f.firebaseapp.com",
    databaseURL: "https://studly-ed04f.firebaseio.com",
    projectId: "studly-ed04f",
    storageBucket: "studly-ed04f.appspot.com",
    messagingSenderId: "21341825630",
};

Firebase.initializeApp(config);

export function requestGifs(term = null) {
    return function(dispatch) {
        request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
            dispatch({
                type: REQUEST_GIFS,
                payload: response
            });
        });
    }
}

export function favoriteGif({selectedGif}) {
    const userUid = Firebase.auth().currentUser.uid;
    const gifId = selectedGif.id;

    return dispatch => Firebase.database().ref(userUid).update({
        [gifId]: selectedGif
    });
}

export function unfavoriteGif({selectedGif}) {
    const userUid = Firebase.auth().currentUser.uid;
    const gifId = selectedGif.id;

    return dispatch => Firebase.database().ref(userUid).child(gifId).remove();
}

export function fetchFavoritedGifs() {
    return function(dispatch) {
        const userUid = Firebase.auth().currentUser.uid;

        Firebase.database().ref(userUid).on('value', snapshot => {
            dispatch({
                type: FETCH_FAVORITED_GIFS,
                payload: snapshot.val()
            })
        });
    }
}

export function openModal(gif) {
    return {
        type: OPEN_MODAL,
        gif
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}

export function signUpUser(credentials) {
    return function(dispatch) {
        Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser());
            })
            .catch(error => {
                console.log(error);
                dispatch(authError(error));
            });
    }
}

export function signInUser(credentials) {
    return function(dispatch) {
        Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser());
            })
            .catch(error => {
                dispatch(authError(error));
            });
    }
}

export function signOutUser() {
    return function (dispatch) {
        Firebase.auth().signOut()
            .then(() =>{
                dispatch({
                    type: SIGN_OUT_USER
                })
            });
    }
}


export function verifyAuth() {
    return function (dispatch) {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(authUser());
            } else {
                dispatch(signOutUser());
            }
        });
    }
}

export function authUser() {
    return {
        type: AUTH_USER
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

