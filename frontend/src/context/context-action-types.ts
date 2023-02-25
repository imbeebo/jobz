import RestService from "../rest/rest-service";
import User from "../models/dto-user";


export const SET_REST_SERVICE = 'SET_REST_SERVICE';

interface SetRestServiceAction {
    type: typeof SET_REST_SERVICE,
    restService: RestService
}

export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

interface SetAuthenticatedAction {
    type: typeof SET_AUTHENTICATED,
    authenticated: boolean
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

interface SetCurrentUserAction {
    type: typeof SET_CURRENT_USER,
    me: User
}

export type ContextActionTypes = SetRestServiceAction | SetAuthenticatedAction | SetCurrentUserAction;
