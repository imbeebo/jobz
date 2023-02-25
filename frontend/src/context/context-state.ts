import RestService from "../rest/rest-service";
import User from "../models/dto-user";

export interface ContextState {
    restService: RestService,
    me: User
}