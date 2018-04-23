import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import {AuthGuard} from './services/auth-guard.service';
import {CraigmapsComponent} from './components/craigmaps/craigmaps.component';
import {TravelComponent} from './components/craigmaps/travel/travel.component';
import {RentalComponent} from './components/craigmaps/rental/rental.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/websitenew', component: WebsiteNewComponent},
  {path: 'profile/websitelist/:webId/websiteedit', component: WebsiteEditComponent},
  {path: 'profile/websitelist', component: WebsiteListComponent},
  {path: 'profile/craigmaps', component: CraigmapsComponent},
  {path: 'profile/craigmaps/admin', component: CraigmapsComponent},
  {path: 'profile/craigmaps/admin/travels', component: TravelComponent},
  {path: 'profile/craigmaps/admin/rentals', component: RentalComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
