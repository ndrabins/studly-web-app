import { combineReducers } from 'redux';
import AuthReducer from './auth';
import CourseReducer from './courses';
import AssignmentReducer from './assignments';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: AuthReducer,
    courses: CourseReducer,
    assignments: AssignmentReducer,
    form: FormReducer,
    router: routerReducer
});

export default rootReducer;
