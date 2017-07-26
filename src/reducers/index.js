import { combineReducers } from 'redux';
import AuthReducer from './auth';
import CourseReducer from './courses';
import AssignmentReducer from './assignments';
import ProfileReducer from './profile';
import AnnoucementReducer from './announcements';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: AuthReducer,
    courses: CourseReducer,
    assignments: AssignmentReducer,
    profile: ProfileReducer,
    announcements: AnnoucementReducer,
    form: FormReducer,
    router: routerReducer
});

export default rootReducer;
