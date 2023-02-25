import jwt_decode from "jwt-decode";

import { ContextActionTypes, SET_CURRENT_USER, SET_REST_SERVICE } from "./context-action-types";
import RestService from "../rest/rest-service";
import User from "../models/dto-user";
import { AsyncAction } from "../store/store";

export function setRestService(restService: RestService): ContextActionTypes {
    return {
        type: SET_REST_SERVICE,
        restService
    };
}

export function setCurrentUser(me: User): ContextActionTypes {
    return {
        type: SET_CURRENT_USER,
        me
    };
}

export function logoutAction() {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch(setCurrentUser(undefined));
    }
}

export function connectToServer(): AsyncAction {
    return (dispatch, getState) => {
        const { me, restService } = getState().context;
        const token = localStorage.getItem('token');
        if (!me && token) {
            try {
                const decoded: { exp: number, email: string } = jwt_decode(token);
                if (decoded.exp >= new Date().getTime() / 1000) {

                    restService.getUser()
                        .then((user) => dispatch(setCurrentUser(user)));

                }
            } catch (e) {
            }
        }

    }
}