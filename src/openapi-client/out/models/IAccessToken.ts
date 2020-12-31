/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IUser } from './IUser';

export type IAccessToken = {
    value: string;
    expires: string;
    user: IUser;
}
