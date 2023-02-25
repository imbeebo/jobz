import User from "../models/dto-user";
import axios from 'axios';
import DTOQRCode from "../models/dto-qr-code";

export default class RestService {
    private static BASE_PATH = 'http://localhost:3000/api/v1';

    public async register(user: User): Promise<User> {
        return this.post<User>(`${RestService.BASE_PATH}/user/signup`, user)
            .then(d => User.deserialize(d));
    }

    private getConfig() {
        return {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
    }

    public async signin(user: User): Promise<User> {
        return this.post<{ token: string, user: User }>(`${RestService.BASE_PATH}/user/signin`, user)
            .then((model) => {
                localStorage.setItem('token', model.token);
                return User.deserialize(model.user);
            });
    }

    public async getUser(): Promise<User> {
        return this.get<User>(`${RestService.BASE_PATH}/user/me`)
            .then(d => User.deserialize(d));
    }

    public async generateQrCode(name: string, data: string): Promise<void> {
        return this.post<void>(`${RestService.BASE_PATH}/qr/${name}`, { data: data });
    }

    public async getQrCode(name: string): Promise<DTOQRCode> {
        return this.get<DTOQRCode>(`${RestService.BASE_PATH}/qr?name=${name}`)
            .then(resp => DTOQRCode.deserialize(resp));
    }

    public async getQrCodes(): Promise<Array<DTOQRCode>> {
        return this.get<Array<DTOQRCode>>(`${RestService.BASE_PATH}/qr/list`)
            .then(response => {
                return response.map(d => {
                    return DTOQRCode.deserialize(d)
                })
            });
    }

    public async getMedia(): Promise<Array<any>> {
        return this.get<Array<any>>(`${RestService.BASE_PATH}/video/list`);
    }

    public async uploadFile(data: FormData): Promise<unknown> {
        return this.post(`${RestService.BASE_PATH}/video`, data);
    }

    public getStreamUrl(id: string): string {
        return `${RestService.BASE_PATH}/video/stream/${id}`;
    }



    public async deleteVideo(id: string): Promise<void> {
        return this.delete(`${RestService.BASE_PATH}/video/${id}`);
    }

    private get<T>(url: string): Promise<T> {
        return axios.get(url, this.getConfig()).then(resp => resp.data);
    }

    private post<T>(url: string, data: unknown): Promise<T> {
        return axios.post(url, data, this.getConfig()).then(resp => resp.data);
    }

    private delete<T>(url: string): Promise<T> {
        return axios.delete(url, this.getConfig()).then(resp => resp.data);
    }


}