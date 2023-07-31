import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';
import { User } from '../models/user';

export const USERS_FEATURE_KEY = 'users';



export interface UsersState{
    user: User,
    isAuthenticated: boolean,
    
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> = createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = {
    user: undefined,
    isAuthenticated: false,

};

const usersReducer = createReducer(
    initialUsersState,
    on(UsersActions.buildUserSession, (state) => ({
        ...state,
        
    })),
    on(UsersActions.buildUserSessionSuccess, (state, { user }) => ({
        ...state,
        user: user,
        isAuthenticated: true,
    })),
    on(UsersActions.buildUserSessionFailure, (state, { error }) => ({
        ...state,
        error,
        isAuthenticated: false,
    }))
);



export function reducer(state: UsersState | undefined, action: Action) {
    return usersReducer(state, action);
}
