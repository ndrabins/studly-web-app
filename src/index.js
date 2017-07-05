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

const config = {
    apiKey: "AIzaSyDVmPnm6gixi4mZ-rrhXQPzHTCKGjiF2Aw",
    authDomain: "studly-ed04f.firebaseapp.com",
    databaseURL: "https://studly-ed04f.firebaseio.com",
    projectId: "studly-ed04f",
    storageBucket: "studly-ed04f.appspot.com",
    messagingSenderId: "21341825630",
};

firebase.initializeApp(config);
window.firebase.initializeApp(config);

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

export default store;
