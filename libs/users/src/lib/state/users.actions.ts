import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const buildUserSession = createAction('[Users] Build User Session');


export const buildUserSessionSuccess = createAction('Load Users Success', props<{ user: User}>());

export const buildUserSessionFailure = createAction(' Load Users Failure', props<{ error: any }>());
