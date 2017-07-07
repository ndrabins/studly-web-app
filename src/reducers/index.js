import { combineReducers } from 'redux';
import AuthReducer from './auth';
import GifsReducer from './gifs';
import ModalReducer from './modal';
import CourseReducer from './courses';
import AssignmentReducer from './assignments';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: AuthReducer,
    courses: CourseReducer,
    assignments: AssignmentReducer,
    form: FormReducer,
    gifs: GifsReducer,
    modal: ModalReducer,
    router: routerReducer
});

export default rootReducer;
