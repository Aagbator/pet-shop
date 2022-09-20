export interface IAuthPayload {
    username: string;
    password: string;
};

export interface IAuthResponse {
    code: number;
    type: string;
    message: string;
};