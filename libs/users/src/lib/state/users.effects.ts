import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, concatMap } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
    private actions$ = inject(Actions);
    constructor(private localStorageService: LocalstorageService, private userService: UsersService) {}
    buildUserSession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.buildUserSession),
            concatMap(() => {
                if (this.localStorageService.isValidToken()) {
                    const userId = this.localStorageService.getUserIdFromToken();
                    if(userId){
                        return this.userService.getUser(userId).pipe(
                            switchMap((user) => {
                                return of(UsersActions.buildUserSessionSuccess({ user }));
                            }
                            ),
                            catchError((error) => of(UsersActions.buildUserSessionFailure({ error })))
                        );
                    }
                } else {
                    return of(UsersActions.buildUserSessionFailure({ error: 'No user session' }));
                }
            }),

            catchError((error) => of(UsersActions.buildUserSessionFailure({ error })))
        )
    );
}
