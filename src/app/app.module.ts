import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { FormsModule } from '@angular/forms';
import { QuillEditorModule } from 'ngx-quill-editor';
import { WebsiteService } from './services/website.service.client';
import { UserService } from './services/user.service.client';
import {SharedService} from './services/shared.service';
import {AuthGuard} from './services/auth-guard.service';
import { HttpModule } from '@angular/http';
import { DirectivesDirective } from './directives.directive';
import { SortableDirective } from './sortable.directive';
import { CraigmapsComponent } from './components/craigmaps/craigmaps.component';
import {CraigmapsService} from './services/craigmaps.service.client';
import { NgxLineChartModule } from 'ngx-line-chart';
import { TravelComponent } from './components/craigmaps/travel/travel.component';
import { RentalComponent } from './components/craigmaps/rental/rental.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WebsiteListComponent,
    DirectivesDirective,
    SortableDirective,
    CraigmapsComponent,
    TravelComponent,
    RentalComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    QuillEditorModule,
    HttpModule,
    NgxLineChartModule
  ],
  providers: [UserService, WebsiteService, SharedService, AuthGuard, CraigmapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
