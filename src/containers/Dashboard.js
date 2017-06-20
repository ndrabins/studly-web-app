import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';


import '../styles/app.css';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
              Dashboard
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        gifs: state.gifs.favorites,
        modalIsOpen: state.modal.modalIsOpen,
        selectedGif: state.modal.selectedGif
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
