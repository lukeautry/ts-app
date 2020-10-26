/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ICreateUserRequest } from '../models/ICreateUserRequest';
import type { IUpdateUserRequest } from '../models/IUpdateUserRequest';
import type { IUser } from '../models/IUser';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @param pageNumber
     * @param pageSize
     * @result IUser Ok
     * @throws ApiError
     */
    public static async getUsers({
        pageNumber = 1,
        pageSize = 20,
    }: {
        pageNumber?: number,
        pageSize?: number,
    }
): Promise<Array<IUser>> {
    const result = await __request({
        method: 'GET',
        path: `/users`,
        query: {
            'page_number': pageNumber,
            'page_size': pageSize,
        },
    });
    return result.body;
}

/**
 * @param requestBody
 * @result IUser Ok
 * @throws ApiError
 */
public static async createUser({
    requestBody,
}: {
    requestBody: ICreateUserRequest,
}
): Promise<IUser> {
    const result = await __request({
        method: 'POST',
        path: `/users`,
        body: requestBody,
    });
    return result.body;
}

/**
 * @param userId
 * @result IUser Ok
 * @throws ApiError
 */
public static async getUserById({
    userId,
}: {
    userId: number,
}
): Promise<IUser> {
    const result = await __request({
        method: 'GET',
        path: `/users/${userId}`,
    });
    return result.body;
}

/**
 * @param userId
 * @param requestBody
 * @result IUser Ok
 * @throws ApiError
 */
public static async updateUser({
    userId,
    requestBody,
}: {
    userId: number,
    requestBody: IUpdateUserRequest,
}
): Promise<IUser> {
    const result = await __request({
        method: 'PATCH',
        path: `/users/${userId}`,
        body: requestBody,
    });
    return result.body;
}

/**
 * @param userId
 * @result any No content
 * @throws ApiError
 */
public static async deleteUser({
    userId,
}: {
    userId: number,
}
): Promise<any> {
    const result = await __request({
        method: 'DELETE',
        path: `/users/${userId}`,
    });
    return result.body;
}

}