import { combineReducers } from "redux";
import userReducer from './User';
import adminReducer from './Admin';
const reducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
})
export default reducer;