import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import firebase from 'firebase';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//Production
const config = {
    apiKey: "AIzaSyDVmPnm6gixi4mZ-rrhXQPzHTCKGjiF2Aw",
    authDomain: "studly-ed04f.firebaseapp.com",
    databaseURL: "https://studly-ed04f.firebaseio.com",
    projectId: "studly-ed04f",
    storageBucket: "studly-ed04f.appspot.com",
    messagingSenderId: "21341825630",
};

//DEVELOPMENT
//Replace this with whatever firebase dev setup you have.

//  var config = {
//     apiKey: "AIzaSyD9mzeMy8qlgPCEo57AxgjP7b7fbgd1ATM",
//     authDomain: "studly-development-79a96.firebaseapp.com",
//     databaseURL: "https://studly-development-79a96.firebaseio.com",
//     projectId: "studly-development-79a96",
//     storageBucket: "studly-development-79a96.appspot.com",
//     messagingSenderId: "531251956181"
//   };

firebase.initializeApp(config);
// window.firebase.initializeApp(config);

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

export default store;
