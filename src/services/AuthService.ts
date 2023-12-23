import { AxiosResponse } from 'axios';
import AxiosClient from './_server/AxiosClient';

/* eslint-disable @typescript-eslint/no-explicit-any */
const AuthService = {
  login: (username: string, password: string): Promise<AxiosResponse<any, any>> =>
    AxiosClient.post('/auth/login', { username, password }),
  refreshToken: (refreshToken: string): Promise<AxiosResponse<any, any>> =>
    AxiosClient.post('/auth/refresh-token', { refreshToken }),
  logout: (): Promise<AxiosResponse<any, any>> => AxiosClient.post('/auth/logout')
};

export default AuthService;
