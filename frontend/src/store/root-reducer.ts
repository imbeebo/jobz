import {combineReducers} from "redux";
import {contextReducer} from "../context/context-reducer";

const rootReducer = () => combineReducers({
    context: contextReducer
});

export default rootReducer;