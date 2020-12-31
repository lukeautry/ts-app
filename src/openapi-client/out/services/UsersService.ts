/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IAccessToken } from '../models/IAccessToken';
import type { IChangePasswordParams } from '../models/IChangePasswordParams';
import type { IConsumeResetPasswordParams } from '../models/IConsumeResetPasswordParams';
import type { ILoginRequest } from '../models/ILoginRequest';
import type { IUpdateUserParams } from '../models/IUpdateUserParams';
import type { IUser } from '../models/IUser';
import type { IUserRegisterParams } from '../models/IUserRegisterParams';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @returns IAccessToken Ok
     * @throws ApiError
     */
    public static async register({
        requestBody,
    }: {
        requestBody: IUserRegisterParams,
    }): Promise<IAccessToken> {
        const result = await __request({
            method: 'POST',
            path: `/users/register`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @returns IAccessToken Ok
     * @throws ApiError
     */
    public static async login({
        requestBody,
    }: {
        requestBody: ILoginRequest,
    }): Promise<IAccessToken> {
        const result = await __request({
            method: 'POST',
            path: `/users/login`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @returns IUser Ok
     * @throws ApiError
     */
    public static async current(): Promise<IUser> {
        const result = await __request({
            method: 'GET',
            path: `/users`,
        });
        return result.body;
    }

    /**
     * @returns IUser Ok
     * @throws ApiError
     */
    public static async update({
        requestBody,
    }: {
        requestBody: IUpdateUserParams,
    }): Promise<IUser> {
        const result = await __request({
            method: 'PUT',
            path: `/users`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @returns any No content
     * @throws ApiError
     */
    public static async changePassword({
        requestBody,
    }: {
        requestBody: IChangePasswordParams,
    }): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/users/change_password`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @returns any No content
     * @throws ApiError
     */
    public static async resetPassword({
        email,
    }: {
        email: string,
    }): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/users/reset_password`,
            query: {
                'email': email,
            },
        });
        return result.body;
    }

    /**
     * @returns IAccessToken Ok
     * @throws ApiError
     */
    public static async consumeResetPassword({
        requestBody,
    }: {
        requestBody: IConsumeResetPasswordParams,
    }): Promise<IAccessToken> {
        const result = await __request({
            method: 'POST',
            path: `/users/consume_reset_password`,
            body: requestBody,
        });
        return result.body;
    }

}