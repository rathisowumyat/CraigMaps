import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { PageListComponent } from './components/page/page-list/page-list.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './components/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget/widget-edit/widget-youtube/widget-youtube.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:userId', component: ProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:userId/websitenew', component: WebsiteNewComponent},
  {path: 'profile/:userId/websitelist/:webId/websiteedit', component: WebsiteEditComponent},
  {path: 'profile/:userId/websitelist', component: WebsiteListComponent},
  {path: 'pagenew', component: PageNewComponent},
  {path: 'pageedit', component: PageEditComponent},
  {path: 'pagelist', component: PageListComponent},
  {path: 'widgetedit', component: WidgetEditComponent},
  {path: 'widgetlist', component: WidgetListComponent},
  {path: 'widgetchooser', component: WidgetChooserComponent},
  {path: 'widgetheader', component: WidgetHeaderComponent},
  {path: 'widgetimage', component: WidgetImageComponent},
  {path: 'widgetyoutube', component: WidgetYoutubeComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
