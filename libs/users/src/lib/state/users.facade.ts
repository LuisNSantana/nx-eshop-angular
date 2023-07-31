import { Injectable, inject } from '@angular/core';
import { select, Store} from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
    private readonly store = inject(Store);

     currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
     isAuthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuthenticated));

 
    buildUserSession() {
        this.store.dispatch(UsersActions.buildUserSession());
    }
}
