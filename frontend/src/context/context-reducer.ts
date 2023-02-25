import {ContextActionTypes, SET_CURRENT_USER, SET_REST_SERVICE} from "./context-action-types";
import {ContextState} from "./context-state";
import RestService from "../rest/rest-service";

const initialState: ContextState = {
    restService: new RestService(),
    me: undefined
}

export function contextReducer(state = initialState, action: ContextActionTypes): ContextState {
    switch (action.type) {
        case SET_REST_SERVICE:
            return {
                ...state,
                restService: action.restService
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                me: action.me
            }
        default:
            return state
    }
}