import {Action, applyMiddleware, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import rootReducer from './root-reducer';
import {ContextState} from "../context/context-state";

// export const appHistory = createBrowserHistory();

export interface ApplicationState {
    context: ContextState
}

const initialState = {};
//
// const routerMiddleware = createRouterMiddleware();

const reducer = rootReducer();
export type RootState = ReturnType<typeof reducer>;

export type AsyncAction = ThunkAction<void, RootState, unknown, Action<any>>

const store = createStore(
    rootReducer(),
    initialState,
    applyMiddleware(thunk)
);
export default store;